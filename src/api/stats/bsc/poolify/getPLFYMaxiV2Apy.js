const BigNumber = require('bignumber.js');
const { bscWeb3: web3 } = require('../../../../utils/web3');

const RewardManager_ABI = require('../../../../abis/PoolifyRewardManager.json');
const fetchPrice = require('../../../../utils/fetchPrice');
const { getTotalStakedInUsd } = require('../../../../utils/getTotalStakedInUsd');
const { compound } = require('../../../../utils/compound');
const { DAILY_HPY,BSC_CHAIN_ID } = require('../../../../constants');
const getBlockNumber = require('../../../../utils/getBlockNumber');


const BIFI = '0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c';
const REWARDS_MANAGER = '0x0cF8B032031e4D96b7b628aa9054379Ede9076e5';
const ORACLE = 'tokens';
const ORACLE_ID = 'PLFY';

const getPLFYMaxiV2Apy = async () => {

  const [yearlyRewardsInUsd, totalStakedInUsd] = await Promise.all([
    getYearlyRewardsInUsd(REWARDS_MANAGER, ORACLE, ORACLE_ID),
    getTotalStakedInUsd(REWARDS_MANAGER, BIFI, ORACLE, ORACLE_ID)
  ]);

  const simpleApy = yearlyRewardsInUsd.dividedBy(totalStakedInUsd);

  const apy = compound(simpleApy, DAILY_HPY, 1, 1);

  return { 'plfy-maxi-v2': apy };
};

const getYearlyRewardsInUsd = async (rewardsManagerAddress, oracle, oracleId) => {
  const fromBlock = await getBlockNumber(BSC_CHAIN_ID);
  const toBlock = fromBlock + 1;
  //console.log('RewardManager_ABI',RewardManager_ABI);
  const _rewardManagerContract = new web3.eth.Contract(RewardManager_ABI, rewardsManagerAddress);

  const multiplier = new BigNumber(
    await _rewardManagerContract.methods.getMultiplier(fromBlock, toBlock).call()
  );
  const blockRewards = new BigNumber(await _rewardManagerContract.methods.poolifyPerBlock().call());
  console.log('blockRewards',blockRewards.toFormat());
  let { allocPoint } = await _rewardManagerContract.methods.poolInfo(0).call();
        allocPoint = new BigNumber(allocPoint);

  const totalAllocPoint = new BigNumber('1000'); //await _rewardManagerContract.methods.totalAllocPoint.call()
  /*
    THIS IS MISSING, dont forget to set "totalAllocPoint" as public in the  PoolifyRewardManager. So for now it's hardcoded
  */

  const poolBlockRewards = blockRewards
    .times(multiplier)
    .times(allocPoint)
    .dividedBy(totalAllocPoint);

  const secondsPerBlock = 3;
  const secondsPerYear = 31536000;
  const yearlyRewards = poolBlockRewards.dividedBy(secondsPerBlock).times(secondsPerYear);

  const plfyPrice = await fetchPrice({ oracle, id: oracleId });
  const yearlyRewardsInUsd = yearlyRewards.times(new BigNumber(plfyPrice)).dividedBy('1e18');

  return yearlyRewardsInUsd;
};

module.exports = getPLFYMaxiV2Apy;
