const BigNumber = require('bignumber.js');
const { ethers } = require('ethers');
const { MULTICHAIN_RPC } = require('../constants');

const MULTICALLS = {
  56: '0xbcf79F67c2d93AD5fd1b919ac4F5613c493ca34F',
  97: '0xAD9a03422392811A134EA5563F6C27e8F6C08ffc'
};

const MulticallAbi = require('../abis/PoolifyPriceMulticall.json');
const ERC20 = require('../abis/common/ERC20/ERC20.json');
const BATCH_SIZE = 128;

const sortByKeys = o => {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
};

const calcTokenPrice = (knownPrice, knownToken, unknownToken) => {
  const valuation = knownToken.balance.dividedBy(knownToken.decimals).multipliedBy(knownPrice);
  const price = valuation.multipliedBy(unknownToken.decimals).dividedBy(unknownToken.balance);
  const weight = knownToken.balance.plus(unknownToken.balance).toNumber();

  return {
    price: price.toNumber(),
    weight: unknownToken.balance.dividedBy(unknownToken.decimals).toNumber(),
  };
};

const calcLpPrice = (pool, tokenPrices) => {
  const lp0 = pool.lp0.balance
    .multipliedBy(tokenPrices[pool.lp0.oracleId])
    .dividedBy(pool.lp0.decimals);
  const lp1 = pool.lp1.balance
    .multipliedBy(tokenPrices[pool.lp1.oracleId])
    .dividedBy(pool.lp1.decimals);
  return lp0.plus(lp1).multipliedBy(pool.decimals).dividedBy(pool.totalSupply).toNumber();
};

const fetchAmmPrices = async (pools, knownPrices) => {
  let prices = { ...knownPrices };
  let lps = {};
  let weights = {};
  Object.keys(knownPrices).forEach(known => {
    weights[known] = Number.MAX_SAFE_INTEGER;
  });

  for (let chain in MULTICALLS) {
    let filtered = pools.filter(p => p.chainId == chain);

    // Old BSC pools don't have the chainId attr
    if (chain == '56') {
      filtered = pools.filter(p => p.chainId === undefined).concat(filtered);
    }

    // Setup multichain
    const provider = new ethers.providers.JsonRpcProvider(MULTICHAIN_RPC[chain]);
    const multicall = new ethers.Contract(MULTICALLS[chain], MulticallAbi, provider);

    // Split query in batches
    const query = filtered.map(p => [p.address, p.lp0.address, p.lp1.address]);
    for (let i = 0; i < filtered.length; i += BATCH_SIZE) {
      const batch = query.slice(i, i + BATCH_SIZE);
      let buf = [];
      try {
        buf = await multicall.getLpInfo(batch);
      } catch (e) {
        console.error('fetchAmmPrices', e);
      }

      // Merge fetched data
      for (let j = 0; j < batch.length; j++) {
        filtered[j + i].totalSupply = new BigNumber(buf[j * 3 + 0]?.toString());
        filtered[j + i].lp0.balance = new BigNumber(buf[j * 3 + 1]?.toString());
        filtered[j + i].lp1.balance = new BigNumber(buf[j * 3 + 2]?.toString());
      }
    }

    const unsolved = filtered.slice();
    let solving = true;
    while (solving) {
      solving = false;

      for (let i = unsolved.length - 1; i >= 0; i--) {
        const pool = unsolved[i];

        let knownToken, unknownToken;
        if (pool.lp0.oracleId in prices) {
          knownToken = pool.lp0;
          unknownToken = pool.lp1;
        } else if (pool.lp1.oracleId in prices) {
          knownToken = pool.lp1;
          unknownToken = pool.lp0;
        } else {
          console.log('unsolved: ', pool.lp0.oracleId, pool.lp1.oracleId, pool.name);
          continue;
        }

        const { price, weight } = calcTokenPrice(
          prices[knownToken.oracleId],
          knownToken,
          unknownToken
        );
        if (weight > (weights[unknownToken.oracleId] || 0)) {
          prices[unknownToken.oracleId] = price;
          weights[unknownToken.oracleId] = weight;
        }
        lps[pool.name] = calcLpPrice(pool, prices);

        unsolved.splice(i, 1);
        solving = true;
      }
    }
  }

  return {
    poolPrices: sortByKeys(lps),
    tokenPrices: sortByKeys(prices),
  };
};

module.exports = { fetchAmmPrices };
