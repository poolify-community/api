import { bsc } from './bsc';
import { eth } from './eth';
import Chain from '../types/chain';
import { ChainId } from '../types/chainid';
import { ConstRecord } from '../types/const';

export * from '../types/chainid';

const _addressBook: {
  readonly bsc: Chain;
  readonly eth: Chain;
} = {
  bsc,
  eth
} as const;

const _addressBookByChainId: {
  readonly '56': Chain;
  readonly '1': Chain;
} = {
  [ChainId.bsc]: bsc,
  [ChainId.eth]: eth,
} as const;

export const addressBook: ConstRecord<typeof _addressBook, Chain> = _addressBook;

export const addressBookByChainId: ConstRecord<typeof _addressBookByChainId, Chain> =
  _addressBookByChainId;
