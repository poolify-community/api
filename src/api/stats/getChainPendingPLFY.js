const BigNumber = require('bignumber.js');
const { MultiCall } = require('eth-multicall');
const { web3Factory, multicallAddress } = require('../../utils/web3');
const { MULTICHAIN_POOLS } = require('../../constants');
const { getStrategies } = require('../../utils/getStrategies.js');
const getBlockNumber = require('../../utils/getBlockNumber');
const RewardManager_ABI = require('../../abis/PoolifyRewardManager.json');
const Strategy_ABI = require('../../abis/common/Strategy/StrategyPLFY.json');
const StrategyLiquidity_ABI = require('../../abis/common/Strategy/StrategyPLFYLiquidity.json');
import Web3 from 'web3';
const MasterChef = require('../../abis/MasterChef.json');
import {ChainIdReverse,addressBook} from '../../address-book';

const { bsc } = addressBook;
const REWARDS_MANAGER = '0xFC11C0C53BF631e979b3478B25DF2FaaCc61E04E';// bsc.platforms.poolifyfinance.rewardManager;


const getChainPendingPLFY = async chain => {
  console.log('chain',chain);

  const chainId   = chain.chainId;
  const chainName = ChainIdReverse[chainId];
  const vaults    = MULTICHAIN_POOLS[chainName];

  const vaultPendingPLFY = await getVaultPendingPLFY(chainId, vaults);
    console.log('>  vaultPendingPFY',vaultPendingPLFY);

  return vaultPendingPLFY;
};
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


const getVaultPendingPLFY = async (chainId, vaults) => {
  const web3 = web3Factory(chainId);
  const multicall = new MultiCall(web3, multicallAddress(chainId));
  const pendingCalls = [];
  vaults = await getStrategies(vaults,ChainIdReverse[chainId]);
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
  let result = {};
  vaults.map((v,i) => {
    result[v.id] = res[0][i].pendingReward;
  });
  return result;
};


module.exports = getChainPendingPLFY;
