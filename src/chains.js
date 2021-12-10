const chains = {
  bsc: {
    id: 56,
    bifi: "0xca3f508b8e4dd382ee878a314789373d80a5190a",
    rewards: "0x453D4Ba9a2D594314DF88564248497F7D74d6b2C",
    maxi: "0xf7069e41C57EcC5F122093811d8c75bdB5f7c14e",
    moonpot: {
      gate: "0xb4651e8A3E70d0BE1B1D1241C3679F1572c23e48",
      multicall: "0x61a8820940e61B5543D5A417dd9581c88Fe0521D",
    },
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/bsc_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/bsc_pools.js",
    multicall: {
      address: "0x8B326CA2A9c15b1730dBF21d396eB3a282EAC04B",
      batch: 250,
    },
    rpc: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
      "https://bsc-dataseed2.defibit.io/",
      "https://bsc-dataseed3.defibit.io/",
      "https://bsc-dataseed4.defibit.io/",
      "https://bsc-dataseed2.ninicoin.io/",
      "https://bsc-dataseed3.ninicoin.io/",
      "https://bsc-dataseed4.ninicoin.io/",
      "https://bsc-dataseed1.binance.org/",
      "https://bsc-dataseed2.binance.org/",
      "https://bsc-dataseed3.binance.org/",
      "https://bsc-dataseed4.binance.org/",
    ],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 1500,
      start: 1457038,
    },
  },

  heco: {
    id: 128,
    bifi: "0x765277eebeca2e31912c9946eae1021199b39c61",
    rewards: "0x5f7347fedfD0b374e8CE8ed19Fc839F59FB59a3B",
    maxi: "0x688724Fb44cD7eabF209Ca2B225880033e9563d2",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/heco_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/heco_pools.js",
    multicall: {
      address: "0x92BC92304Fe5f85D6451e890EBd46606Eaf354eb",
      batch: 250,
    },
    rpc: ["https://http-mainnet.hecochain.com"],
    query: {
      limit: 2000,
      interval: 100,
      sleep: 1500,
      start: 3738191,
    },
  },

  polygon: {
    id: 137,
    bifi: "0xfbdd194376de19a88118e84e279b977f165d01b8",
    rewards: "0xDeB0a777ba6f59C78c654B8c92F80238c8002DD2",
    maxi: "0xfEcf784F48125ccb7d8855cdda7C5ED6b5024Cb3",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/polygon_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/polygon_pools.js",
    multicall: {
      address: "0x9FE5D998c39B5B6d6Fc4a5ad1E54Af40974C0F02",
      batch: 250,
    },
    rpc: ["https://polygon-rpc.com"],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 1500,
      start: 13908161,
    },
  },

  fantom: {
    id: 250,
    bifi: "0xd6070ae98b8069de6b494332d1a1a81b6179d960",
    rewards: "0x7fB900C14c9889A559C777D016a885995cE759Ee",
    maxi: "0xbF07093ccd6adFC3dEB259C557b61E94c1F66945",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/fantom_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/fantom_pools.js",
    multicall: {
      address: "0x81eA78BddEfFe1e1A150A3cac2272D6d9511d26e",
      batch: 250,
    },
    rpc: ["https://rpc.ftm.tools", "https://rpcapi.fantom.network"],
    query: {
      limit: 5000,
      interval: 100,
      sleep: 1500,
      start: 6903757,
    },
  },

  avax: {
    id: 43114,
    bifi: "0xd6070ae98b8069de6b494332d1a1a81b6179d960",
    rewards: "0x86d38c6b6313c5A3021D68D1F57CF5e69197592A",
    maxi: "0xCeefB07Ad37ff165A0b03DC7C808fD2E2fC77683",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/avalanche_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/avalanche_pools.js",
    multicall: {
      address: "0x744eC1752Ab3b18AE786A051197a55112069BdDE",
      batch: 250,
    },
    rpc: ["https://api.avax.network/ext/bc/C/rpc"],
    query: {
      limit: 1000,
      interval: 100,
      sleep: 1500,
      start: 0,
    },
  },

  arbitrum: {
    id: 42161,
    bifi: "0x99c409e5f62e4bd2ac142f17cafb6810b8f0baae",
    rewards: "0x48f4634c8383af01bf71aefbc125eb582eb3c74d",
    maxi: "0x78AB636351c1C5f117C1442B82d14aB3a92F8464",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/arbitrum_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/arbitrum_pools.js",
    multicall: {
      address: "0x563eC4A3E48b9E0c2E0428084978cD64efcac780",
      batch: 250,
    },
    rpc: ["https://arb1.arbitrum.io/rpc"],
    query: {
      limit: 5000,
      interval: 100,
      sleep: 1500,
      start: 1500258,
    },
  },

  harmony: {
    id: 1666600000,
    bifi: "0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8",
    rewards: "0x5b96bbaca98d777cb736dd89a519015315e00d02",
    maxi: "0x6207536011918F1A0D8a53Bc426f4Fd54df2E5a8",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/harmony_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/harmony_pools.js",
    multicall: {
      address: "0xa624ac7824c5038af0aef333a6eedc674e45bf56",
      batch: 250,
    },
    rpc: ["https://a.api.s0.t.hmny.io"],
    query: {
      limit: 1024,
      interval: 100,
      sleep: 1500,
      start: 16030000,
    },
  },

  moonriver: {
    id: 1285,
    bifi: "0x173fd7434B8B50dF08e3298f173487ebDB35FD14",
    rewards: "0x4aabd0d73181325dd1609ce696ef048702de7153",
    maxi: "0xc9a509dA14525Ad3710e9448a0839EE2e90E48B1",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/moonriver_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/moonriver_pools.js",
    multicall: {
      address: "0x75d370DaDf9F02eDEF51b6B14CC98A4Df6c5350f",
      batch: 250,
    },
    rpc: ["https://rpc.moonriver.moonbeam.network"],
    query: {
      limit: 2000,
      interval: 100,
      sleep: 1500,
      start: 759936,
    },
  },

  celo: {
    id: 42220,
    bifi: "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C",
    rewards: "0x2D250016E3621CfC50A0ff7e5f6E34bbC6bfE50E",
    maxi: "0xf68C61E3c2f9C48E53391E1FCd2db1f19998151b",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/celo_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/celo_pools.js",
    multicall: {
      address: "0x88D537a86e09B753361D70448d60D3dC2D75883d",
      batch: 250,
    },
    rpc: ["https://forno.celo.org"],
    query: {
      limit: 5000,
      interval: 100,
      sleep: 1500,
      start: 9426941,
    },
  },

  cronos: {
    id: 25,
    bifi: "0xe6801928061CDbE32AC5AD0634427E140EFd05F9",
    rewards: "0x107Dbf9c9C0EF2Df114159e5C7DC2baf7C444cFF",
    maxi: "0xBa5041B1c06e8c9cFb5dDB4b82BdC52E41EA5FC5",
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/cronos_stake.js",
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/cronos_pools.js",
    multicall: {
      address: "0xdAaD0085e5D301Cb5721466e600606AB5158862b",
      batch: 250,
    },
    rpc: ["https://evm-cronos.crypto.org"],
    query: {
      limit: 2500,
      interval: 100,
      sleep: 1500,
      start: 51291,
    },
  },
};

module.exports = {
  chains,
};