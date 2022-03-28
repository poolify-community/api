import { compound } from './compound';

export const getFarmWithTradingFeesApy = (
  farmApr,
  tradingApr: number | undefined,
  compoundingsPerYear,
  t,
  shareAfterPoolifyPerformanceFee
) => {
  const farmApy = farmApr
    ? compound(farmApr, compoundingsPerYear, t, shareAfterPoolifyPerformanceFee)
    : 0;
    console.log('>  farmApr',farmApr,farmApy);
  const finalAPY = (1 + farmApy) * (1 + Number(tradingApr || 0)) - 1;
  return finalAPY;
};
