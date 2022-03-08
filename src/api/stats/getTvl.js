const getChainTvl = require('./getChainTvl.js');

const {
  BSC_CHAIN_ID,
  BSC_TEST_CHAIN_ID,
  BSC_VAULTS_ENDPOINT,
  BSC_TEST_VAULTS_ENDPOINT
} = require('../../constants');

const INIT_DELAY = 40 * 1000;
const REFRESH_INTERVAL = 15 * 60 * 1000;

let tvl = {};

const chains = [
  {
    chainId: BSC_CHAIN_ID,
    vaultsEndpoint: BSC_VAULTS_ENDPOINT,
    governancePool: require('../../data/governancePool.json'),
  },
  {
    chainId: BSC_TEST_CHAIN_ID,
    vaultsEndpoint: BSC_TEST_VAULTS_ENDPOINT,
    governancePool: require('../../data/bscTest/governancePool.json'),
  }
];

const getTvl = () => {
  return tvl;
};

const updateTvl = async () => {
  console.log('> updating tvl');

  try {
    let promises = [];

    chains.forEach(chain => promises.push(getChainTvl(chain)));

    const results = await Promise.allSettled(promises);

    for (const result of results) {
      if (result.status !== 'fulfilled') {
        console.warn('getChainTvl error', result.reason);
        continue;
      }
      tvl = { ...tvl, ...result.value };
    }

    console.log('> updated tvl');
  } catch (err) {
    console.error('> tvl initialization failed', err);
  }

  setTimeout(updateTvl, REFRESH_INTERVAL);
};

setTimeout(updateTvl, INIT_DELAY);

module.exports = getTvl;
