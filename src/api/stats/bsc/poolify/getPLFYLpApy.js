const BigNumber = require('bignumber.js');
const { bscWeb3: web3 } = require('../../../../utils/web3');
import { getMasterChefApys } from '../../common/getMasterChefApys';

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

const getPLFYLpApy = async () =>
  await getMasterChefApys({
    web3: web3,
    chainId: chainId,
    masterchef: REWARDS_MANAGER,
    masterchefAbi: RewardManager_ABI,
    tokenPerBlock: 'poolifyPerBlock',
    hasMultiplier: false,
    secondsPerBlock: 1,
    allocPointIndex: '2',
    pools: pools,
    oracleId: 'PLFY',
    oracle: 'tokens',
    decimals: '1e18',
    tradingFeeInfoClient: null,
    liquidityProviderFee: null,
    log: true,
  });

module.exports = { getPLFYLpApy };