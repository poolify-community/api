import TokenSymbol from '../src/utils/tokenSymbol';
export const pools = [
    {
      id: "poolify-maxi",
      logo: "https://app.poolify.finance/assets/tokens/poolify.png",
      name: "POOLIFY Maxi",
      token: "PLFY",
      tokenDescription: "Poolify.Finance",
      tokenAddress: "0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c",
      tokenExplorer: "https://testnet.bscscan.com/address/0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c",
      tokenDecimals: 18,
      pricePerFullShare: 1,
      tvl: 0,
      oracle: "tokens",
      oracleId: "PLFY",
      oraclePrice: 0,
      depositsPaused: false,
      status: "active",
      platform: "Poolify.Finance",
      assets: [
          "PLFY"
      ],
      stratType: "SingleStake",
      withdrawalFee: "0.05%",
      buyTokenUrl: "https://app.1inch.io/#/56/swap/BNB/PLFY",
      createdAt: 1606511757,
      isPoolifyStaking: true,
      categories: [
          "core",
          "SingleAsset"
      ],
      vaultToken:"bucketPLFY",
      vaultTokenAddress: "0xb2E3a0BFDD84a402410CE9f1E065b95FC269593B",
      vaultContractAddress: "0xb2E3a0BFDD84a402410CE9f1E065b95FC269593B",
      vaultExplorer: "https://testnet.bscscan.com/address/0xb2E3a0BFDD84a402410CE9f1E065b95FC269593B",
      rewardManagerPoolIndex:0, // for the pending PLFY
      tokenA:TokenSymbol.POOLIFY,
      tokenB:null,//TokenSymbol.BNB,
  },
  {
    id: "cakev2-PLFY-BNB",
    logo: "https://app.poolify.finance/assets/tokens/dummyToken.png",
    name: "PLFY-BNB LP",
    token: "PLFY-BNB LP",
    tokenDescription: "PancakeSwap - PLFY-BNB Liquidity",
    tokenAddress: "0x976a7753c88EBFD2d3154B8764a0176769e5a372",
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "cakev2-plfy-bnb",
    oraclePrice: 0,
    depositsPaused: false,
    status: "active",
    platform: "PancakeSwap",
    assets: ["PLFY", "BNB"],
    risks: ["COMPLEXITY_LOW", "BATTLE_TESTED", "MCAP_MEDIUM", "AUDIT", "CONTRACTS_VERIFIED"],
    stratType: "Strat LP",
    addLiquidityUrl:
      "https://pancake.kiemtienonline360.com/add/0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c/0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    buyTokenUrl:
      "https://pancake.kiemtienonline360.com/swap?outputCurrency=0x12BB890508c125661E03b09EC06E404bc9289040",
    createdAt: 1647560542,
    isPoolifyStaking: false,
    categories: [
        "core",
        "SingleAsset"
    ],
    vaultToken: "bucketCakeV2PLFY-BNB",
    vaultTokenAddress: "0xe5370AC4222Be4C6E3009290Cc5E6284523FBF6B",
    vaultContractAddress: "0xe5370AC4222Be4C6E3009290Cc5E6284523FBF6B",
    vaultExplorer: "https://testnet.bscscan.com/address/0xe5370AC4222Be4C6E3009290Cc5E6284523FBF6B",
    rewardManagerPoolIndex:1,
    tokenA:TokenSymbol.POOLIFY,
    tokenB:TokenSymbol.BNB,
  }
];