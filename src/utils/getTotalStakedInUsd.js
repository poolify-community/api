const BigNumber = require('bignumber.js');
const { web3Factory } = require('./web3');
const { BSC_CHAIN_ID } = require('../constants');

const ERC20 = require('../abis/ERC20.json');
const fetchPrice = require('./fetchPrice');

const getTotalStakedInUsd = async (
  targetAddr,
  tokenAddr,
  oracle,
  oracleId,
  decimals = '1e18',
  chainId = BSC_CHAIN_ID
) => {
  const web3 = web3Factory(chainId);
  //console.log('tokenAddr',tokenAddr);
  //console.log('targetAddr',targetAddr);
  const tokenContract = new web3.eth.Contract(ERC20, tokenAddr);
  const totalStaked = new BigNumber(await tokenContract.methods.balanceOf(targetAddr).call());
  const tokenPrice = await fetchPrice({ oracle, id: oracleId });

  return totalStaked.times(tokenPrice).dividedBy(decimals);
};

const getTotalLpStakedInUsd = async (targetAddr, pool, chainId = BSC_CHAIN_ID) => {
  return await getTotalStakedInUsd(targetAddr, pool.address, 'lps', pool.name, '1e18', chainId);
};

module.exports = { getTotalStakedInUsd, getTotalLpStakedInUsd };
