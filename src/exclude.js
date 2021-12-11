const { blacklist } = require("./blacklist");
const { chains } = require("./chains");
const { getLpBifiData, getMooBifiBoostAddresses, getLpBifiBoostedData, getStrategyAddressForVaults } = require("./stakes");


var excludedAddresses = new Set();

//Load all excluded lists
const loadExcludedAddresses = async () => {

    Object.values(blacklist).forEach(address => {
        excludedAddresses.add(address.toLocaleLowerCase());
    });

    for (const chain of Object.values(chains)) {
        excludedAddresses.add(chain.maxi.toLocaleLowerCase());
        excludedAddresses.add(chain.rewards.toLocaleLowerCase());

        //Add Vault addresses
        let lps = await getLpBifiData(chain);
        lps.forEach(lp => excludedAddresses.add(lp.address.toLocaleLowerCase()));

        //Add mooBifi boost addresses
        let boosts = await getMooBifiBoostAddresses(chain);
        boosts.forEach(boost => excludedAddresses.add(boost.toLocaleLowerCase()));

        //Add BIFI vault boost addresses
        let lpBoosts = await getLpBifiBoostedData(chain);
        lpBoosts.forEach(lpBoost => excludedAddresses.add(lpBoost.address.toLocaleLowerCase()));

        //Add strategy addresses fir BIFI vaults + Maxi
        const vaultAddresses = lps.map(lp => lp.address);
        let strategies = await getStrategyAddressForVaults([...vaultAddresses, chain.maxi], chain);
        strategies.forEach(strat => excludedAddresses.add(strat.toLocaleLowerCase()));
    }

}

const isAddressExcluded = (address) => {
    return excludedAddresses.has(address.toLocaleLowerCase());
}

module.exports = {
    loadExcludedAddresses,
    isAddressExcluded
}