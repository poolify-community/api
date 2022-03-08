import Web3 from 'web3';
import { addressBookByChainId, ChainId } from '../../packages/address-book/address-book';
import { BeefyFinance } from '../../packages/address-book/types/beefyfinance';

import {
  BSC_RPC_ENDPOINTS,
  BSC_CHAIN_ID,
  BSC_TEST_CHAIN_ID,
  BSC_TEST_RPC
} from '../constants';

const MULTICALLS: Record<ChainId, Pick<BeefyFinance, 'multicall'>['multicall']> = {
  [ChainId.bsc]: addressBookByChainId[ChainId.bsc].platforms.beefyfinance.multicall,
  [ChainId.bscTest]: addressBookByChainId[ChainId.bscTest].platforms.beefyfinance.multicall,
};

const clients: Record<keyof typeof ChainId, Web3[]> = {
  bsc: [],
  bscTest: []
};
BSC_RPC_ENDPOINTS.forEach(endpoint => {
  clients.bsc.push(new Web3(endpoint));
});
clients.bscTest.push(new Web3(BSC_TEST_RPC));

export const chainRandomClients = {
  bscRandomClient: () => clients.bsc[~~(clients.bsc.length * Math.random())],
  bscTestRandomClient: () => clients.bscTest[~~(clients.bscTest.length * Math.random())],
};

export const _web3Factory = (chainId: ChainId) => {
  switch (chainId) {
    case BSC_CHAIN_ID:
      return chainRandomClients.bscRandomClient();
    case BSC_TEST_CHAIN_ID:
      return chainRandomClients.bscTestRandomClient();
  }
};

export const _multicallAddress = (chainId: ChainId) => MULTICALLS[chainId];
