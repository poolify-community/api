import { ConstRecord } from '../../../types/const';
import Token from '../../../types/token';

const BNB = {
  name: 'WBNB Token',
  symbol: 'WBNB',
  address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  chainId: 56,
  decimals: 18,
  website: 'https://www.binance.com/',
  description:
    'Binance Coin (BNB) is an exchange-based token created and issued by the cryptocurrency exchange Binance. Initially created on the Ethereum blockchain as an ERC-20 token in July 2017, BNB was migrated over to Binance Chain in February 2019 and became the native coin of the Binance Chain.',
  logoURI:
    'https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
} as const;

const _tokens = {
  ERTHA: {
    name: 'ERTHA',
    symbol: 'ERTHA',
    address: '0x62823659d09F9F9D2222058878f89437425eB261',
    chainId: 56,
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/20317/large/Ry9tgUal_400x400.jpg?1636856709',
    website: 'https://ertha.io/',
    description: 'Own NFT land in ERTHA metaverse & generate lifetime revenue',
  }
} as const;
export const tokens: ConstRecord<typeof _tokens, Token> = _tokens;
