import Web3 from 'web3';
import { addressBookByChainId, ChainId } from '../../packages/address-book/address-book';
import { BeefyFinance } from '../../packages/address-book/types/beefyfinance';

import {
  BSC_RPC_ENDPOINTS,
  BSC_CHAIN_ID,
  ETH_CHAIN_ID,
  ETH_RPC
} from '../constants';

const MULTICALLS: Record<ChainId, Pick<BeefyFinance, 'multicall'>['multicall']> = {
  [ChainId.bsc]: addressBookByChainId[ChainId.bsc].platforms.beefyfinance.multicall,
  [ChainId.eth]: addressBookByChainId[ChainId.eth].platforms.beefyfinance.multicall,
};

const clients: Record<keyof typeof ChainId, Web3[]> = {
  bsc: [],
  eth: []
};
BSC_RPC_ENDPOINTS.forEach(endpoint => {
  clients.bsc.push(new Web3(endpoint));
});
clients.eth.push(new Web3(ETH_RPC));

export const chainRandomClients = {
  bscRandomClient: () => clients.bsc[~~(clients.bsc.length * Math.random())],
  ethRandomClient: () => clients.eth[~~(clients.eth.length * Math.random())],
};

export const _web3Factory = (chainId: ChainId) => {
  switch (chainId) {
    case BSC_CHAIN_ID:
      return chainRandomClients.bscRandomClient();
    case ETH_CHAIN_ID:
      return chainRandomClients.ethRandomClient();
  }
};

export const _multicallAddress = (chainId: ChainId) => MULTICALLS[chainId];
