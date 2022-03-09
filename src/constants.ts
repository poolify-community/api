import { ChainId } from '../packages/address-book/address-book';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

const BASE_HPY = 2190;
const MINUTELY_HPY = 525600;
const HOURLY_HPY = 8760;
const DAILY_HPY = 365;
const WEEKLY_HPY = 52;

const FORTUBE_REQ_TOKENS = 'https://bsc.for.tube/api/v2/bank_tokens';
const FORTUBE_REQ_MARKETS = 'https://bsc.for.tube/api/v1/bank/markets?mode=extended';
const FORTUBE_API_TOKEN = process.env.FORTUBE_API_TOKEN;

const MAINNET_BSC_RPC_ENDPOINTS = [
  'https://bsc-dataseed.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed1.ninicoin.io',
  'https://bsc-dataseed2.defibit.io',
  'https://bsc-dataseed3.defibit.io',
  'https://bsc-dataseed4.defibit.io',
  'https://bsc-dataseed2.ninicoin.io',
  'https://bsc-dataseed3.ninicoin.io',
  'https://bsc-dataseed4.ninicoin.io',
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
];

const ETH_RPC_ENDPOINTS = [
  'https://data-seed-prebsc-1-s1.binance.org:8545',
  'https://data-seed-prebsc-2-s1.binance.org:8545',
  'https://data-seed-prebsc-1-s2.binance.org:8545',
  'https://data-seed-prebsc-2-s2.binance.org:8545',
  'https://data-seed-prebsc-1-s3.binance.org:8545',
  'https://data-seed-prebsc-2-s3.binance.org:8545'
];

const CUSTOM_BSC_RPC_ENDPOINTS = [process.env.BSC_RPC].filter(item => item);

const BSC_RPC_ENDPOINTS = CUSTOM_BSC_RPC_ENDPOINTS.length? CUSTOM_BSC_RPC_ENDPOINTS: MAINNET_BSC_RPC_ENDPOINTS;

const BSC_RPC = process.env.BSC_RPC || BSC_RPC_ENDPOINTS[0];
const ETH_RPC = process.env.ETH_RPC || ETH_RPC_ENDPOINTS[0];

const BSC_CHAIN_ID = ChainId.bsc;
const ETH_CHAIN_ID = ChainId.eth;

const DFYN_LPF = 0.003;
const SUSHI_LPF = 0.003;
const SPIRIT_LPF = 0.003;
const QUICK_LPF = 0.003;
const APEPOLY_LPF = 0.002;
const COMETH_LPF = 0.005;
const PCS_LPF = 0.0025;
const APE_LPF = 0.002;
const SPOOKY_LPF = 0.002;
const JOE_LPF = 0.003;
const SOLAR_LPF = 0.0025;
const FUSEFI_LPF = 0.003;
const NET_LPF = 0.003;
const PANGOLIN_LPF = 0.003;
const TETHYS_LPF = 0.002;
const BEAMSWAP_LPF = 0.0017;

const MULTICHAIN_RPC: Record<ChainId, string> = {
  [ChainId.bsc]: BSC_RPC,
  [ChainId.eth]: ETH_RPC
};

const BSC_VAULTS_POOLS = require('../pools/bsc');
const ETH_VAULTS_POOLS = require('../pools/eth');

const MULTICHAIN_POOLS = {
  bsc: BSC_VAULTS_POOLS.pools,
  eth : ETH_VAULTS_POOLS.pools
};

const BEEFY_PERFORMANCE_FEE = 0.045;
const SHARE_AFTER_PERFORMANCE_FEE = 1 - BEEFY_PERFORMANCE_FEE;

const EXCLUDED_IDS_FROM_TVL = ['venus-wbnb'];

export {
  API_BASE_URL,
  BSC_RPC,
  BSC_RPC_ENDPOINTS,
  BSC_CHAIN_ID,
  BSC_VAULTS_POOLS,
  ETH_RPC,
  ETH_CHAIN_ID,
  ETH_VAULTS_POOLS,
  BASE_HPY,
  MINUTELY_HPY,
  HOURLY_HPY,
  DAILY_HPY,
  WEEKLY_HPY,
  FORTUBE_REQ_TOKENS,
  FORTUBE_REQ_MARKETS,
  FORTUBE_API_TOKEN,
  MULTICHAIN_RPC,
  MULTICHAIN_POOLS,
  DFYN_LPF,
  SUSHI_LPF,
  SPIRIT_LPF,
  QUICK_LPF,
  APEPOLY_LPF,
  COMETH_LPF,
  PCS_LPF,
  APE_LPF,
  SPOOKY_LPF,
  JOE_LPF,
  SOLAR_LPF,
  FUSEFI_LPF,
  NET_LPF,
  PANGOLIN_LPF,
  TETHYS_LPF,
  BEAMSWAP_LPF,
  BEEFY_PERFORMANCE_FEE,
  SHARE_AFTER_PERFORMANCE_FEE,
  EXCLUDED_IDS_FROM_TVL,
};
