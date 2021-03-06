export const poolifyfinance = {
  strategyOwner: '', // Instance of timelock contract
  vaultOwner: '',  // Instance of timelock contract
  treasurer: '',// Treasurer wallet
  devMultisig: '', // Instance of GnosisSafeProxy (multi sig wallet)
  rewardManager: '0x3d7CaE4CD61Ba4BE9A50D354204B6Fe5c772BfFa', // Poolify Reward Manager
  treasury: '', // Treasury contract
  gasPrice: '', // Gas price contract
  multicall: '0x7BB2DEe8bF04F811525d00e2bF694dD1D29F0a62', // Multicall contract
  harvestAll: '0x838A7Da98eC630Cd9281C824BC85287D261135D8' // Harvest Multiple Vault at once
} as const;