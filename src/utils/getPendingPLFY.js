const BigNumber = require('bignumber.js');
const { MultiCall } = require('eth-multicall');
const { multicallAddress } = require('./web3');
const { _web3Factory } = require('./web3Helpers');
const RewardManager_ABI = require('../abis/PoolifyRewardManager.json');

import {ChainIdReverse,addressBook} from '../address-book';

const { bsc } = addressBook;
const REWARDS_MANAGER = bsc.platforms.poolifyfinance.rewardManager;

/*
const getVaultPendingPLFY = async (chainId, vaults) => {
  const web3 = web3Factory(chainId);
  const multicall = new MultiCall(web3, multicallAddress(chainId));
  const pendingCalls = [];


  vaults = await getStrategies(vaults,ChainIdReverse[chainId]);
  const fromBlock = await getBlockNumber(97);
  
  const rewardManagerContract = new web3.eth.Contract(RewardManager_ABI,REWARDS_MANAGER);

  vaults.forEach((vault,index) => {
    //console.log('vault',vault);
    console.log('config',vault.rewardManagerPoolIndex,vault.strategy,REWARDS_MANAGER);
    pendingCalls.push({
      blockRewards:rewardManagerContract.methods.poolifyPerBlock(),
      totalAllocPoint:rewardManagerContract.methods.totalAllocPoint(),
      poolInfo:rewardManagerContract.methods.poolInfo(vault.rewardManagerPoolIndex),
      userInfo:rewardManagerContract.methods.userInfo(vault.rewardManagerPoolIndex,vault.strategy),
      position: index.toString()
    });
  });

  
  const res = await multicall.all([pendingCalls],{traditional:true});
  vaults = await vaults.map(async (v,i) => {
    let data = res[0][i];
    let { allocPoint,accPoolifyPerShare,lpSupply,lastRewardBlock } = data.poolInfo;
    let { amount,rewardDebt } = data.userInfo;
    let multiplier = await rewardManagerContract.methods.getMultiplier(lastRewardBlock, fromBlock).call();

    
    const poolBlockRewards = new BigNumber(data.blockRewards)
    .times(multiplier)
    .times(allocPoint)
    .dividedBy(data.totalAllocPoint);
    
    const newAccPoolifyPerShare = new BigNumber(accPoolifyPerShare).plus(poolBlockRewards.dividedBy(data.totalAllocPoint));
    const pendingPoolify = (new BigNumber(amount).times(newAccPoolifyPerShare).dividedBy('1e18').minus(rewardDebt));
    console.log('>  pendingPoolify',pendingPoolify.dividedBy('1e18').toFormat());
    console.log('data.position',data.position);
    v.pendingPoolify = pendingPoolify.dividedBy('1e18').toNumber();
  });
  console.log('vaults',vaults);
  return vaults;
};
*/


const getPendingPLFY = async (vaults,chainId) => {
  const web3 = _web3Factory(ChainId[chain]);
  const multicall = new MultiCall(web3, multicallAddress(ChainId[chain]));
  const pendingCalls = [];
  const rewardManagerContract = new web3.eth.Contract(RewardManager_ABI,REWARDS_MANAGER);

  vaults.forEach((vault,index) => {
    //console.log('vault',vault);
    console.log('config',vault.rewardManagerPoolIndex,vault.strategy,REWARDS_MANAGER);
    pendingCalls.push({
      pendingReward: rewardManagerContract.methods.pendingPoolify(vault.rewardManagerPoolIndex,vault.strategy), //rewardManagerPoolIndex
      position: index.toString()
    });
  });

  
  const res = await multicall.all([pendingCalls],{traditional:true});
  const pendingRewards = res[0].map(v => v.pendingReward);
  // Merge fetched data
  batch.forEach((_,index) => {
    vaults[index + i].pendingReward = pendingRewards[index] ? parseInt(pendingRewards[index]) : 0;
  });
  return vaults;
};


module.exports = {getPendingPLFY};
