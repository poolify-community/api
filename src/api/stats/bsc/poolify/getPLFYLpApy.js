const BigNumber = require('bignumber.js');
const { bscWeb3: web3 } = require('../../../../utils/web3');

const RewardManager_ABI = require('../../../../abis/PoolifyRewardManager.json');
const fetchPrice = require('../../../../utils/fetchPrice');
const { getTotalStakedInUsd } = require('../../../../utils/getTotalStakedInUsd');
const { compound } = require('../../../../utils/compound');
const { DAILY_HPY,BSC_CHAIN_ID } = require('../../../../constants');
const getBlockNumber = require('../../../../utils/getBlockNumber');

import { addressBook } from '../../../../address-book';

const { bsc } = addressBook;

const PLFY = bsc.tokens.PLFY.address;
const REWARDS_MANAGER = bsc.platforms.poolifyfinance.rewardManager;
const ORACLE_ID = 'PLFY';

const getPLFYLpApy = async () => {

  const [yearlyRewardsInUsd, totalStakedInUsd] = await Promise.all([
    getYearlyRewardsInUsd(REWARDS_MANAGER, 'tokens', ORACLE_ID),
    getTotalStakedInUsd(REWARDS_MANAGER, PLFY, 'lps', 'cakev2-PLFY-BNB')
  ]);

  const simpleApy = yearlyRewardsInUsd.dividedBy(totalStakedInUsd);

  const apy = compound(simpleApy, DAILY_HPY, 1, 1);

  return { 'cakev2-PLFY-BNB': apy };
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
  let { allocPoint } = await _rewardManagerContract.methods.poolInfo(1).call();
        allocPoint = new BigNumber(allocPoint);

  const totalAllocPoint = new BigNumber(await _rewardManagerContract.methods.totalAllocPoint().call());
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

module.exports = getPLFYLpApy;
