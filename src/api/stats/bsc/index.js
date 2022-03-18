
//const getCakeApys = require('./pancake/getCakeApys');
//const getCakePoolApy = require('./pancake/getCakePoolApy');
const getPLFYLpApy = require('./poolify/getPLFYLpApy');
const getPLFYMaxiV2Apy = require('./poolify/getPLFYMaxiV2Apy');
//const getPLFYGovApy = require('./poolify/getPLFYGovApy');

const getApys = [
  //getPLFYGovApy,
  getPLFYLpApy,
  getPLFYMaxiV2Apy,
  //getCakeApys,
  //getCakePoolApy,
  //getCakeLpApys,
  //getCakeV2PoolApy,
];
// ^^ APYs are sorted alphabetically

const getBSCApys = async () => {
  let apys = {};
  let apyBreakdowns = {};

  let promises = [];
  getApys.forEach(getApy => promises.push(getApy()));
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.warn('getBscApys error', result.reason);
      continue;
    }

    // Set default APY values
    let mappedApyValues = result.value;
    let mappedApyBreakdownValues = {};

    // Loop through key values and move default breakdown format
    // To require totalApy key
    for (const [key, value] of Object.entries(result.value)) {
      mappedApyBreakdownValues[key] = {
        totalApy: value,
      };
    }

    // Break out to apy and breakdowns if possible
    let hasApyBreakdowns = 'apyBreakdowns' in result.value;
    if (hasApyBreakdowns) {
      mappedApyValues = result.value.apys;
      mappedApyBreakdownValues = result.value.apyBreakdowns;
    }

    apys = { ...apys, ...mappedApyValues };

    apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
  }

  return {
    apys,
    apyBreakdowns,
  };
};

module.exports = { getBSCApys };
