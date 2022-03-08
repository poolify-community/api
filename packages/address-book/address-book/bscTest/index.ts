import { ape } from './platforms/ape';
import { chainlink } from './platforms/chainlink';
import { bakery } from './platforms/bakery';
import { beefyfinance } from './platforms/beefyfinance';
import { pancake } from './platforms/pancake';
import { ironfinance } from './platforms/ironfinance';
import { farmhero } from './platforms/farmhero';
import { ellipsis } from './platforms/ellipsis';
import { elk } from './platforms/elk';
import { wault } from './platforms/wault';
import { kebab } from './platforms/kebab';
import { jet } from './platforms/jet';
import { mdex } from './platforms/mdex';
import { biswap } from './platforms/biswap';
import { tokens } from './tokens/tokens';
import { convertSymbolTokenMapToAddressTokenMap } from '../../util/convertSymbolTokenMapToAddressTokenMap';
import Chain from '../../types/chain';
import { ConstInterface } from '../../types/const';

const _bscTest = {
  platforms: {
    ape,
    chainlink,
    bakery,
    beefyfinance,
    pancake,
    ironfinance,
    farmhero,
    ellipsis,
    elk,
    wault,
    kebab,
    jet,
    mdex,
    biswap,
  },
  tokens,
  tokenAddressMap: convertSymbolTokenMapToAddressTokenMap(tokens),
};

export const bscTest: ConstInterface<typeof _bscTest, Chain> = _bscTest;
