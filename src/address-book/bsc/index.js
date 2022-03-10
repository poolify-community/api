import { poolifyfinance } from './platforms/poolifyfinance';
import { pancake } from './platforms/pancake';
import { tokens } from './tokens/tokens';
import convertSymbolTokenMapToAddressTokenMap from '../utils/convertSymbolTokenMapToAddressTokenMap';


export const bsc = {
  platforms: {
    poolifyfinance,
    pancake,
  },
  tokens,
  tokenAddressMap: convertSymbolTokenMapToAddressTokenMap(tokens),
};
