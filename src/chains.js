const chains = {
  bsc: {
    id: 56,
    bifi: '0xca3f508b8e4dd382ee878a314789373d80a5190a',
    rewards: '0x453D4Ba9a2D594314DF88564248497F7D74d6b2C',
    maxi: '0xf7069e41C57EcC5F122093811d8c75bdB5f7c14e',
    stakes: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/bsc_stake.js',
    multicall: {
      address: '0x8B326CA2A9c15b1730dBF21d396eB3a282EAC04B',
      batch: 500
    },
    rpc: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://bsc-dataseed2.defibit.io/',
      'https://bsc-dataseed3.defibit.io/',
      'https://bsc-dataseed4.defibit.io/',
      'https://bsc-dataseed2.ninicoin.io/',
      'https://bsc-dataseed3.ninicoin.io/',
      'https://bsc-dataseed4.ninicoin.io/',
      'https://bsc-dataseed1.binance.org/',
      'https://bsc-dataseed2.binance.org/',
      'https://bsc-dataseed3.binance.org/',
      'https://bsc-dataseed4.binance.org/'
    ],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 10000,
      start: 1457038,
    },
  },

  heco: {
    id: 128,
    bifi: '0x765277eebeca2e31912c9946eae1021199b39c61',
    rewards: '0x5f7347fedfD0b374e8CE8ed19Fc839F59FB59a3B',
    maxi: '0x688724Fb44cD7eabF209Ca2B225880033e9563d2',
    stakes: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/heco_stake.js',
    multicall: {
      address: '0x92BC92304Fe5f85D6451e890EBd46606Eaf354eb',
      batch: 500
    },
    rpc: ['https://http-mainnet.hecochain.com'],
    query: {
      limit: 2000,
      interval: 100,
      sleep: 10000,
      start: 3738191,
    },
  },

  polygon: {
    id: 137,
    bifi: '0xfbdd194376de19a88118e84e279b977f165d01b8',
    rewards: '0xDeB0a777ba6f59C78c654B8c92F80238c8002DD2',
    maxi: '0xfEcf784F48125ccb7d8855cdda7C5ED6b5024Cb3',
    stakes: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/polygon_stake.js',
    multicall: {
      address: '0x9FE5D998c39B5B6d6Fc4a5ad1E54Af40974C0F02',
      batch: 500
    },
    rpc: [
      'https://polygon-rpc.com',
      'https://rpc-mainnet.matic.network',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet.chainstacklabs.com',
    ],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 10000,
      start: 13908161,
    },
  },

  fantom: {
    id: 250,
    bifi: '0xd6070ae98b8069de6b494332d1a1a81b6179d960',
    rewards: '0x7fB900C14c9889A559C777D016a885995cE759Ee',
    maxi: '0xbF07093ccd6adFC3dEB259C557b61E94c1F66945',
    stakes: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/fantom_stake.js',
    multicall: {
      address: '0x81eA78BddEfFe1e1A150A3cac2272D6d9511d26e',
      batch: 500
    },
    rpc: [
      'https://rpc.ftm.tools',
      'https://rpcapi.fantom.network'
    ],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 10000,
      start: 6903757,
    },
  },

  avax: {
    id: 43114,
    bifi: '0xd6070ae98b8069de6b494332d1a1a81b6179d960',
    rewards: '0x86d38c6b6313c5A3021D68D1F57CF5e69197592A',
    maxi: '0xCeefB07Ad37ff165A0b03DC7C808fD2E2fC77683',
    stakes: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/avalanche_stake.js',
    multicall: {
      address: '0x744eC1752Ab3b18AE786A051197a55112069BdDE',
      batch: 500
    },
    rpc: ['https://api.avax.network/ext/bc/C/rpc'],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 10000,
      start: 0,
    },
  }
}

module.exports = {
  chains,
};