# beefy-snap
Multichain snapshot algorithm

Adding a new chain:
- The Multicall.sol contract should be deployed and verified on the given chain.
- Chain data should be added to chains.js following the template:
{
    id: 250, //chain id
    bifi: "0xd6070ae98b8069de6b494332d1a1a81b6179d960", // BIFI token address on that chain
    rewards: "0x7fB900C14c9889A559C777D016a885995cE759Ee", // BIFI Rewards pool address on that chain
    maxi: "0xbF07093ccd6adFC3dEB259C557b61E94c1F66945", // BIFI Maxi address on that chain
    stakes:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/stake/fantom_stake.js", //address from where to fetch chain boosts
    vaults:
      "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/fantom_pools.js", //address from where to fetch chain vaults
    multicall: {
      address: "0x81eA78BddEfFe1e1A150A3cac2272D6d9511d26e", // Address for the deployed contract on previous step
      batch: 250, //fixed at 250
    },
    rpc: ["https://rpc.ftm.tools", "https://rpcapi.fantom.network"], // List of reliable RPC addresses
    query: {
      limit: 1000, // Log query search limit compatible with the used RPCs
      interval: 100, // fixed at 100
      sleep: 1500, // fixed at 1500
      start: 6903757, // Block at which the BIFI token contract was deployed on that chain
    },
}
- Ideally, the query limit should be optimized for the used RPCs. The higher the better but not all RPCs support high limits (current usage ranges from 1000 to 5000)

Blacklisting an address:
- Add an entrance to blacklist.js following:
    "address-name": "0xe1A5B6493054D36DDaC337c2B2f407423Bf08a9F",