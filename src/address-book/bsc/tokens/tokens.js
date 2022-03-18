import Chain from '../../utils/chain';

const BNB = {
  name: 'WBNB Token',
  symbol: 'WBNB',
  address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  chainId: Chain.bsc,
  decimals: 18,
  website: 'https://www.binance.com/',
  description:
    'Binance Coin (BNB) is an exchange-based token created and issued by the cryptocurrency exchange Binance. Initially created on the Ethereum blockchain as an ERC-20 token in July 2017, BNB was migrated over to Binance Chain in February 2019 and became the native coin of the Binance Chain.',
  logoURI:
    'https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
}

export const tokens = {
  CAKE: {
    name: 'PancakeSwap Token',
    symbol: 'CAKE',
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    chainId: Chain.bsc,
    decimals: 18,
    website: 'https://pancakeswap.finance/',
    description:
      'PancakeSwap is an automated market maker (AMM) — a decentralized finance (DeFi) application that allows users to exchange tokens, providing liquidity via farming and earning fees in return.',
    logoURI:
      'https://pancakeswap.finance/images/tokens/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
  },
  PLFY: {
    name: 'Poolify Token',
    symbol: 'PLFY',
    address: '0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c',
    chainId: Chain.bsc,
    decimals: 18,
    website: 'https://poolify.finance/',
    description:
      'Poolify is poolify :)',
    logoURI:
      '',
  }
}
