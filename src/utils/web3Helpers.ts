import Web3 from 'web3';
import {ChainId,addressBookByChainId} from '../address-book';

import {
  BSC_RPC_ENDPOINTS,
  ETH_RPC_ENDPOINTS
} from '../constants';

const MULTICALLS = {
  [ChainId.bsc]: addressBookByChainId[ChainId.bsc].platforms.poolifyfinance.multicall,
  //[ChainId.eth]: addressBookByChainId[ChainId.eth].platforms.poolifyfinance.multicall,
};

const clients = {
  bsc: [],
  eth: []
};

BSC_RPC_ENDPOINTS.forEach(endpoint => {
  clients.bsc.push(new Web3(endpoint));
});
ETH_RPC_ENDPOINTS.forEach(endpoint => {
  clients.eth.push(new Web3(endpoint));
});


export const chainRandomClients = {
  bscRandomClient: () => clients.bsc[~~(clients.bsc.length * Math.random())],
  ethRandomClient: () => clients.eth[~~(clients.eth.length * Math.random())],
};

export const _web3Factory = (chainId) => {
  switch (chainId) {
    case ChainId.bsc:
      return chainRandomClients.bscRandomClient();
    case ChainId.eth:
      return chainRandomClients.ethRandomClient();
  }
};

export const _multicallAddress = (chainId) => MULTICALLS[chainId];
