import { addressBook } from '../../../../address-book';
import { getMasterChefApys } from '../../common/getMasterChefApys';

const BigNumber = require('bignumber.js');
const { bscWeb3: web3 } = require('../../../../utils/web3');
const RewardManager_ABI = require('../../../../abis/PoolifyRewardManager.json');
const { BSC_CHAIN_ID } = require('../../../../constants');
const pools = require('../../../../data/poolifyLpPools.json');


const { bsc } = addressBook;
const PLFY = bsc.tokens.PLFY.address;
const REWARDS_MANAGER = bsc.platforms.poolifyfinance.rewardManager;
const ORACLE_ID = 'PLFY';

const getPLFYLpApy = async () =>
  await getMasterChefApys({
    web3: web3,
    chainId: BSC_CHAIN_ID,
    masterchef: REWARDS_MANAGER,
    masterchefAbi: RewardManager_ABI,
    tokenPerBlock: 'poolifyPerBlock',
    hasMultiplier: false,
    pools: pools,
    oracleId: 'PLFY',
    oracle: 'tokens',
    decimals: '1e18',
    tradingFeeInfoClient: null,
    liquidityProviderFee: 0.0017, // Pancake Swap Liquidity Fee
    log: true,
  });

module.exports = { getPLFYLpApy };