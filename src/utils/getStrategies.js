const { MultiCall } = require('eth-multicall');
const { multicallAddress } = require('./web3');
const { _web3Factory } = require('./web3Helpers');
import {ChainId} from '../address-book';


const BATCH_SIZE = 128;

const vaultAbi = require('../abis/BeefyVaultV6.json');

const getStrategies = async (vaults, chain) => {
  // Setup multichain

  const web3 = _web3Factory(ChainId[chain]);
  const multicall = new MultiCall(web3, multicallAddress(ChainId[chain]));

  // Split query in batches 
  const query = vaults.map(v => v.vaultContractAddress);
  for (let i = 0; i < vaults.length; i += BATCH_SIZE) {
    const strategyCalls = [];
    let batch = query.slice(i, i + BATCH_SIZE);
        batch.forEach((vaultContractAddress,index) => {
            const vaultContract = new web3.eth.Contract(vaultAbi, vaultContractAddress);
            strategyCalls.push({
                strategy: vaultContractAddress?vaultContract.methods.strategy():'',
                position:`${index+i}`
            });
        });
    const res = await multicall.all([strategyCalls],{traditional:true});
    const strategies = res[0].map(v => v.strategy);
    
    // Merge fetched data
    batch.forEach((_,index) => {
      vaults[index + i].strategy = strategies[index];
    })
  }

  return vaults;
};

module.exports = { getStrategies };
