export const poolifyfinance = {
  strategyOwner: '', // Instance of timelock contract
  vaultOwner: '',  // Instance of timelock contract
  treasurer: '',// Treasurer wallet
  devMultisig: '', // Instance of GnosisSafeProxy (multi sig wallet)
  rewardPool: '0x7BB2DEe8bF04F811525d00e2bF694dD1D29F0a62', // Poolify Reward Manager
  treasury: '', // Treasury contract
  gasPrice: '', // Gas price contract
  multicall: '0xd5Cd02c90d9DeddffC457763fAe7bA77857D5975', // Multicall contract
  poolifyMaxiStrategy: '0xE9269BC358986c75a8056255e24d97c6A2A079d1', // Poolify Strategy for Poolify Maxi
} as const;
