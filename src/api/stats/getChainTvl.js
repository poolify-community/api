const BigNumber = require('bignumber.js');
const { MultiCall } = require('eth-multicall');
const { web3Factory, multicallAddress } = require('../../utils/web3');
const { MULTICHAIN_POOLS } = require('../../constants');
const fetchPrice = require('../../utils/fetchPrice');
const { EXCLUDED_IDS_FROM_TVL } = require('../../constants');

const vaultAbi = require('../../abis/PoolifyVault.json');
const { getTotalStakedInUsd } = require('../../utils/getTotalStakedInUsd');
import {ChainId,ChainIdReverse} from '../../address-book';



const getChainTvl = async chain => {
  console.log('chain',chain);

  const chainId   = chain.chainId;
  const chainName = ChainIdReverse[chainId];
  const vaults    = MULTICHAIN_POOLS[chainName];

  const vaultBalances = await getVaultBalances(chainId, vaults);
  //console.log('vaultBalances',vaultBalances);
  let tvls = { [chainId]: {} };
  for (let i = 0; i < vaults.length; i++) {
    const vault = vaults[i];

    if (EXCLUDED_IDS_FROM_TVL.includes(vault.id)) {
      console.warn('Excluding', vault.id, 'from tvl');
      continue;
    }

    const vaultBal = vaultBalances[i];
    let tokenPrice = 0;
    try {
      tokenPrice = await fetchPrice({ oracle: vault.oracle, id: vault.oracleId });
    } catch (e) {
      console.error('getTvl fetchPrice', chainId, vault.oracle, vault.oracleId, e);
    }
    const tvl = vaultBal.times(tokenPrice).dividedBy(10 ** (vault.tokenDecimals ?? 18));

    let item = { [vault.id]: 0 };
    if (!tvl.isNaN()) {
      item = { [vault.id]: Number(tvl.toFixed(2)) };
    }

    tvls[chainId] = { ...tvls[chainId], ...item };
  }

  /*
  if (chain.governancePool) {
    let governanceTvl = await getGovernanceTvl(chainId, chain.governancePool);
    tvls[chainId] = { ...tvls[chainId], ...governanceTvl };
  } else {
    console.log('no gov pool');
  }
  */
  return tvls;
};

const getVaultBalances = async (chainId, vaults) => {
  const web3 = web3Factory(chainId);
  const multicall = new MultiCall(web3, multicallAddress(chainId));
  const balanceCalls = [];
  vaults.forEach((vault,index) => {
    const vaultContract = new web3.eth.Contract(vaultAbi, vault.vaultContractAddress);
    balanceCalls.push({
      balance: vaultContract.methods.balance(),
      position: index.toString()
    });
  });
  
  const res = await multicall.all([balanceCalls],{traditional:true});
  console.log('res getVaultBalances',res);
  return res[0].map(v => new BigNumber(v.balance));
};

//Fetches chain's governance pool tvl excluding vaults already depositing in it
// to as to not count twice. (Ex: Maxi deposits in gov pool so shouldn't be counted
// twice per chain)
const getGovernanceTvl = async (chainId, governancePool) => {
  const excludedVaults = Object.values(governancePool.exclude);

  const excludedBalances = await getVaultBalances(chainId, excludedVaults);
  let tokenPrice = 0;

  try {
    tokenPrice = await fetchPrice({ oracle: governancePool.oracle, id: governancePool.oracleId });
  } catch (e) {
    console.error(
      'getGovernanceTvl fetchPrice',
      chainId,
      governancePool.oracle,
      governancePool.oracleId,
      e
    );
  }

  const excludedBalance = excludedBalances.reduce(
    (tot, cur) => tot.plus(cur.times(tokenPrice).dividedBy(governancePool.tokenDecimals)),
    new BigNumber(0)
  );

  let totalStaked = await getTotalStakedInUsd(
    governancePool.address,
    governancePool.tokenAddress,
    governancePool.oracle,
    governancePool.oracleId,
    governancePool.tokenDecimals,
    chainId
  );

  const tvl = Number(totalStaked.minus(excludedBalance));

  let response = {};
  response[governancePool.name] = Number(tvl.toFixed(2));

  return response;
};

module.exports = getChainTvl;
