const axios = require("axios");
const { log } = require("./log");
const { getProvider, sleep } = require("./utils");
const { Contract } = require("ethers");
const { abis } = require("./abis");
const { debug } = require("loglevel");

const getMooBifiBoostAddresses = async (chain) => {
  try {
    let resp = await axios.get(chain.stakes);

    let boosts = parseFileArray(resp.data);

    //keep boosts that take moobifi as input
    return boosts
      .filter(
        (boost) =>
          boost.tokenAddress.toLocaleLowerCase() ===
          chain.maxi.toLocaleLowerCase()
      )
      .map((boost) => boost.earnContractAddress);
  } catch (err) {
    return [];
  }
};

const parseFileArray = (boostFileString) => {
  let index = boostFileString.indexOf("[");

  let boosts = boostFileString.slice(index);
  boosts = boosts.replace(";", "");
  boosts = boosts.replace(/,*;*\s*\n*$/, "");
  boosts = boosts.replace(/partners: \[[a-zA-Z]+\]/gm, "partners: 'fill'");

  const govPoolABI = "";

  let boostArray = [];

  try {
    boostArray = eval("(" + boosts + ")");
  } catch (err) {
    log.debug("Failed to parse boost file string");
    log.error(err);
    boostArray = [];
  }

  return boostArray;
};

const getLpBifiData = async (chain) => {
  try {
    let resp = await axios.get(chain.vaults);

    let vaults = parseFileArray(resp.data);

    //Will fetch all relevant data to find bifi balance with user's moobifi balance later
    let completeVaults = vaults
      .filter(
        (vault) =>
          vault.assets.includes("BIFI") && !vault.id.includes("bifi-maxi")
      )
      .map((vault) => {
        return {
          id: vault.id,
          address: vault.earnContractAddress,
          lpToken: {
            address: vault.tokenAddress,
            decimals: vault.tokenDecimals,
          },
        };
      })
      .map((vault) => {
        return getVaultData(vault, chain);
      });

    return await Promise.all(completeVaults);
  } catch (err) {
    return [];
  }
};

const getLpBifiBoostedData = async (chain) => {
  try {
    let vaultResp = await axios.get(chain.vaults);
    let vaults = parseFileArray(vaultResp.data);
    let boostResp = await axios.get(chain.stakes);
    let boosts = parseFileArray(boostResp.data);

    let bifiLpBoosts = [];

    for (const boost of boosts) {
        let underlyingVaults = vaults
        .filter((vault) =>vault.earnContractAddress.toLocaleLowerCase() == boost.tokenAddress.toLocaleLowerCase());

        if (underlyingVaults.length === 0) {
            log.debug(`Underlying not found ${boost.tokenAddress} `)
            continue;
        }
        let bifiVaults = underlyingVaults.filter(vault=> vault.assets.includes('BIFI') && vault.assets.length > 1);
        
        if (bifiVaults.length !== 0) {
            let vault = underlyingVaults.map((vault) => {
              return {
                id: vault.id,
                address: vault.earnContractAddress,
                lpToken: {
                  address: vault.tokenAddress,
                  decimals: vault.tokenDecimals,
                },
              };
            })[0];
            let vaultData = await getVaultData(vault, chain);
            bifiLpBoosts.push({
                address: boost.earnContractAddress,
                bifiRatio: vaultData.bifiRatio,
                ppfs: vaultData.ppfs
            });
        }
    }

    return bifiLpBoosts;
  } catch (err) {
    log.error(err.message)
    return [];
  }
};

/*
    Gets all the relevant information to find out how much BIFI is staked per mooLPtoken
    User balance is fetched later and multiplied times bifiRatio * ppfs to get it's bifi balance
*/
const getVaultData = async (vault, chain) => {
  let retries = 5;

  let provider = getProvider(chain.rpc);
  while (retries > 0) {
    try {
      const beefyContract = new Contract(chain.bifi, abis.bifi, provider);
      const lpContract = new Contract(
        vault.lpToken.address,
        abis.lps,
        provider
      );
      const vaultContract = new Contract(vault.address, abis.vault, provider);

      let promises = [
        beefyContract.balanceOf(vault.lpToken.address), //BIFI in LP
        lpContract.totalSupply(), //LP totalSupply
        vaultContract.getPricePerFullShare(), //mooToken ppfs
        vaultContract.decimals(), //mooToken decimals
      ];

      let [bifiLPBalance, lpTotalSupply, ppfs, decimals] = await Promise.all(
        promises
      );
      const bifiRatio = bifiLPBalance / 1e18 / lpTotalSupply;
      ppfs = ppfs / 10 ** decimals;

      return {
        id: vault.id,
        address: vault.address,
        bifiRatio,
        ppfs,
      };
    } catch (err) {
      await sleep(2500);
      provider = getProvider(chain.rpc);
      log.error("retrying vault calls " + chain.id);
      log.error(err.message);
    }
    retries--;
  }

  //On continuos retries, default to 0 value for balance
  return {
    id: vault.id,
    address: vault.address,
    bifiRatio: 0,
    ppfs: 1,
  };
};

module.exports = {
  getMooBifiBoostAddresses,
  getLpBifiBoostedData,
  getLpBifiData
};
