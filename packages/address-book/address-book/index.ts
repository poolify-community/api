import { bsc } from './bsc';
import { bscTest } from './bscTest';
import Chain from '../types/chain';
import { ChainId } from '../types/chainid';
import { ConstRecord } from '../types/const';

export * from '../types/chainid';

const _addressBook: {
  readonly bsc: Chain;
  readonly bscTest: Chain;
} = {
  bsc,
  bscTest
} as const;

const _addressBookByChainId: {
  readonly '56': Chain;
  readonly '97': Chain;
} = {
  [ChainId.bsc]: bsc,
  [ChainId.bscTest]: bscTest,
} as const;

export const addressBook: ConstRecord<typeof _addressBook, Chain> = _addressBook;

export const addressBookByChainId: ConstRecord<typeof _addressBookByChainId, Chain> =
  _addressBookByChainId;
