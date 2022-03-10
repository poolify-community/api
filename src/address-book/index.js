import { bsc } from './bsc';
//import { eth } from './eth';
import Chain,{chainReverseMap} from './utils/chain';

export const ChainId = Chain;
export const ChainIdReverse = chainReverseMap;

export const addressBook ={
    bsc,
   // eth
};

export const addressBookByChainId = {
    [Chain.bsc]: bsc,
   // [Chain.eth]: eth,
};
