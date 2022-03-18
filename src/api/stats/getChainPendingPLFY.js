const BigNumber = require('bignumber.js');
const { MultiCall } = require('eth-multicall');
const { web3Factory, multicallAddress } = require('../../utils/web3');
const { MULTICHAIN_POOLS } = require('../../constants');
const { getStrategies } = require('../../utils/getStrategies.js');

const RewardManager_ABI = require('../../abis/PoolifyRewardManager.json');

import {ChainIdReverse,addressBook} from '../../address-book';

const { bsc } = addressBook;
const REWARDS_MANAGER = bsc.platforms.poolifyfinance.rewardManager;


const getChainPendingPLFY = async chain => {
  console.log('chain',chain);

  const chainId   = chain.chainId;
  const chainName = ChainIdReverse[chainId];
  const vaults    = MULTICHAIN_POOLS[chainName];

  const vaultPendingPLFY = await getVaultPendingPLFY(chainId, vaults);
    console.log('>  vaultPendingPFY',vaultPendingPLFY);

  return vaultPendingPLFY;
};

const getVaultPendingPLFY = async (chainId, vaults) => {
  const web3 = web3Factory(chainId);
  const multicall = new MultiCall(web3, multicallAddress(chainId));
  const pendingCalls = [];
  vaults = await getStrategies(vaults,ChainIdReverse[chainId]);

  const rewardManagerContract = new web3.eth.Contract(RewardManager_ABI,REWARDS_MANAGER);
  


  vaults.forEach((vault,index) => {
    const rewardManagerContract = new web3.eth.Contract(RewardManager_ABI,REWARDS_MANAGER);
    console.log('config',vault.rewardManagerPoolIndex != null,vault.strategy);
    pendingCalls.push({
      pendingReward: (vault.rewardManagerPoolIndex != null)?rewardManagerContract.methods.pendingPoolify(vault.rewardManagerPoolIndex,vault.strategy):'0.0', //rewardManagerPoolIndex
      position: index.toString()
    });
  });
  
  const res = await multicall.all([pendingCalls],{traditional:true});
  let result = {};
  vaults.map((v,i) => {
    result[v.id] = res[0][i].pendingReward;
  });
  return result;
};


module.exports = getChainPendingPLFY;
