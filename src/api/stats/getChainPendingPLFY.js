const BigNumber = require('bignumber.js');
const { MultiCall } = require('eth-multicall');
const { web3Factory, multicallAddress } = require('../../utils/web3');
const { MULTICHAIN_POOLS } = require('../../constants');
const { getStrategies } = require('../../utils/getStrategies.js');

const RewardManager_ABI = require('../../abis/PoolifyRewardManager.json');
const { getTotalStakedInUsd } = require('../../utils/getTotalStakedInUsd');
const getBlockNumber = require('../../utils/getBlockNumber');
const { BSC_CHAIN_ID } = require('../../constants');

import {ChainId,ChainIdReverse,addressBook} from '../../address-book';

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
  let res = await rewardManagerContract.methods.pendingPoolify(0,'0xE9269BC358986c75a8056255e24d97c6A2A079d1').call();
  let pool = await rewardManagerContract.methods.poolInfo(0).call();
  let user = await rewardManagerContract.methods.userInfo(0,'0xE9269BC358986c75a8056255e24d97c6A2A079d1').call();

  


  const fromBlock = await getBlockNumber(BSC_CHAIN_ID);
  console.log('> ------- res',res);
  console.log('> ------- fromBlock',fromBlock);
  console.log('> ------- pool',pool);
  console.log('> ------- user',user);

  const multiplier = new BigNumber(
    await rewardManagerContract.methods.getMultiplier(pool.lastRewardBlock, fromBlock).call()
  );
  const blockRewards = new BigNumber(await rewardManagerContract.methods.poolifyPerBlock().call());

  let { allocPoint } = await rewardManagerContract.methods.poolInfo(0).call();
        allocPoint = new BigNumber(allocPoint);

  const totalAllocPoint = new BigNumber('1000'); //await rewardManagerContract.methods.totalAllocPoint.call()
  /*
    THIS IS MISSING, dont forget to set "totalAllocPoint" as public in the  PoolifyRewardManager. So for now it's hardcoded
  */

  const poolBlockRewards = blockRewards.dividedBy('1e18').times(multiplier).times(allocPoint).dividedBy(totalAllocPoint);
  pool.accPoolifyPerShare = new BigNumber(pool.accPoolifyPerShare).plus(poolBlockRewards.times('1e18').dividedBy(pool.lpSupply));
  console.log('poolifyShare',pool.accPoolifyPerShare.toFormat());
  let r = new BigNumber(user.amount).times(pool.accPoolifyPerShare).dividedBy('1e18').minus(user.rewardDebt);
  console.log('result is : ', r.toFormat());
  return null;
/*
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
  return result;*/
};


module.exports = getChainPendingPLFY;
