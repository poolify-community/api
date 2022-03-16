export const pools = [
    {
      id: "poolify-maxi",
      logo: "assets/tokens/poolify.png",
      name: "POOLIFY Maxi",
      token: "PLFY",
      tokenDescription: "Poolify.Finance",
      tokenAddress: "0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c",
      tokenExplorer: "https://testnet.bscscan.com/0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c",
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
      vaultTokenAddress: "0x95EAF0156C05df0fE83859e466ea8877090ac898",
      vaultContractAddress: "0x95EAF0156C05df0fE83859e466ea8877090ac898",
      vaultExplorer: "https://testnet.bscscan.com/0x95EAF0156C05df0fE83859e466ea8877090ac898",
      rewardManagerPoolIndex:0 // for the pending PLFY
  },

  {
    id: 'cakev2-PLFY-BNB',
    name: 'PLFY-BNB LP',
    token: 'PLFY-BNB LP',
    tokenDescription: 'PancakeSwap',
    tokenAddress: '0x976a7753c88EBFD2d3154B8764a0176769e5a372', // pancake LP
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'bucketCakeV2PLFY-BNB',
    earnedTokenAddress: null, // vault LP
    earnContractAddress: null, // vault LP
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'cakev2-plfy-bnb',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'PancakeSwap',
    assets: ['PLFY', 'BNB'],
    risks: ['COMPLEXITY_LOW', 'BATTLE_TESTED', 'MCAP_MEDIUM', 'AUDIT', 'CONTRACTS_VERIFIED'],
    stratType: 'StratLP',
    addLiquidityUrl:
      'https://pancake.kiemtienonline360.com/add/0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c/0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    buyTokenUrl:
      'https://pancake.kiemtienonline360.com/swap?outputCurrency=0x12BB890508c125661E03b09EC06E404bc9289040',
    createdAt: 1645891282,
    isPoolifyStaking: false,
    /* Need to add the vault */
    vaultToken:"bucketCakeV2PLFY-BNB",
    vaultTokenAddress: null,
    vaultContractAddress: null,
    vaultExplorer: "https://testnet.bscscan.com/null",
    rewardManagerPoolIndex:null // for the pending PLFY
  },
];