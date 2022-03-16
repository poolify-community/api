const { MultiCall } = require('eth-multicall');
const { multicallAddress } = require('./web3');
const { _web3Factory } = require('./web3Helpers');
import {ChainId,ChainIdReverse} from '../address-book';


const BATCH_SIZE = 128;

const strategyAbi = require('../abis/common/Strategy/StrategyCommonChefLP.json');

const getLastHarvests = async (vaults, chain) => {
  // Setup multichain
  const web3 = _web3Factory(ChainId[chain]);
  const multicall = new MultiCall(web3, multicallAddress(ChainId[chain]));

  // Split query in batches
  const query = vaults.map(v => v.strategy);
  //console.log('getLastHarvests - query',query);
  for (let i = 0; i < vaults.length; i += BATCH_SIZE) {

    const harvestCalls = [];
    let batch = query.slice(i, i + BATCH_SIZE);
        batch.forEach((strategyAddress,index) => {
          //console.log('strategyAddress',strategyAddress);
            const strategyContract = new web3.eth.Contract(strategyAbi, strategyAddress);
            harvestCalls.push({
              harvest: strategyAddress?strategyContract.methods.lastHarvest():'',
            });
        });
    const res = await multicall.all([harvestCalls],{traditional:true});
    const harvests = res[0].map(v => v.harvest);
  
    //console.log('harvests',harvests);
    // Merge fetched data
    batch.forEach((_,index) => {
      vaults[index + i].lastHarvest = harvests[index] ? parseInt(harvests[index]) : 0;
    });
    
  }

  return vaults;
};

module.exports = { getLastHarvests };
