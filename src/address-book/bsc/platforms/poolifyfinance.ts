export const poolifyfinance = {
  strategyOwner: '', // Instance of timelock contract
  vaultOwner: '',  // Instance of timelock contract
  treasurer: '',// Treasurer wallet
  devMultisig: '', // Instance of GnosisSafeProxy (multi sig wallet)
  rewardManager: '0x0cF8B032031e4D96b7b628aa9054379Ede9076e5', // Poolify Reward Manager
  treasury: '', // Treasury contract
  gasPrice: '', // Gas price contract
  multicall: '0xd5Cd02c90d9DeddffC457763fAe7bA77857D5975', // Multicall contract
  poolifyMaxiStrategy: '0xE9269BC358986c75a8056255e24d97c6A2A079d1', // Poolify Strategy for Poolify Maxi
} as const;