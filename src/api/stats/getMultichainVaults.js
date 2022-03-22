const { getStrategies } = require('../../utils/getStrategies.js');
const { getLastHarvests } = require('../../utils/getLastHarvests.js');
const { getPendingPLFY } = require('../../utils/getPendingPLFY.js');
const { MULTICHAIN_POOLS } = require('../../constants');

const INIT_DELAY = 0 * 1000;
const REFRESH_INTERVAL = 5 * 60 * 1000;

let multichainVaults = [];
var multichainVaultsCounter = 0;
var multichainActiveVaultsCounter = 0;

const getMultichainVaults = () => {
  return multichainVaults;
};

const updateMultichainVaults = async () => {
  console.log('> updating vaults');

  // Reset entire list and counters
  multichainVaults = [];
  multichainVaultsCounter = 0;
  multichainActiveVaultsCounter = 0;
  try {
    for (let chain in MULTICHAIN_POOLS) {
      
      /** This is checking every vault, even if they don't contain "last Harvest" ==> see StrategyCommonChefLP.sol  */
      let chainVaults = MULTICHAIN_POOLS[chain];
          chainVaults = await getStrategies(chainVaults, chain);
          chainVaults = await getLastHarvests(chainVaults, chain);
          chainVaults = await getPendingPLFY(chainVaults, chain);
          console.log('chainVaults',chainVaults);

      var chainVaultsCounter = 0;
      var chainActiveVaultsCounter = 0;

      for (let vault in chainVaults) {
        chainVaults[vault].chain = chain;
        multichainVaults.push(chainVaults[vault]);

        chainVaultsCounter += 1;
        multichainVaultsCounter += 1;

        if (chainVaults[vault].status == 'active') {
          chainActiveVaultsCounter += 1;
          multichainActiveVaultsCounter += 1;
        }
      }

      // console.log(
      //   'Found',
      //   chainVaultsCounter,
      //   'vaults (',
      //   chainActiveVaultsCounter,
      //   'active ) in',
      //   chain
      // );
    }

    console.log(`> updated ${multichainVaultsCounter} vaults (${multichainActiveVaultsCounter} active )`);
  } catch (err) {
    console.error('> vaults update failed', err);
  }

  setTimeout(updateMultichainVaults, REFRESH_INTERVAL);
};

setTimeout(updateMultichainVaults, INIT_DELAY);

module.exports = getMultichainVaults;
