const getChainPendingPLFY = require('./getChainPendingPLFY.js');

const { BSC_CHAIN_ID } = require('../../constants');

const INIT_DELAY = 40 * 1;
const REFRESH_INTERVAL = 15 * 60 * 1000;

let pendingRewards = {};

const chains = [
  {
    chainId: BSC_CHAIN_ID,
  }
];

const getPendingRewards = () => {
  return pendingRewards;
};

const updatePendingRewards = async () => {
  console.log('> updating pendingRewards');

  try {
    let promises = [];

    chains.forEach(chain => promises.push(getChainPendingPLFY(chain)));

    const results = await Promise.allSettled(promises);

    for (const result of results) {
      if (result.status !== 'fulfilled') {
        console.warn('getChainPendingPLFY error', result.reason);
        continue;
      }
      pendingRewards = { ...pendingRewards, ...result.value };
    }

    console.log('> updated pendingRewards');
  } catch (err) {
    console.error('> pendingRewards initialization failed', err);
  }

  setTimeout(updatePendingRewards, REFRESH_INTERVAL);
};

setTimeout(updatePendingRewards, INIT_DELAY);

module.exports = getPendingRewards;
