import { addressBook } from '../../../../packages/address-book/address-book';
const { bsc} = addressBook;

// BIFI lp pair bifi maxi uses per chain
export const bifiLpMap = {
  bsc: bsc.platforms.pancake.bifiBnbLp
} as const;
