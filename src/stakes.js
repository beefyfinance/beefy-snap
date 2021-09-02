const axios = require('axios');

const getMooBifiBoostAddresses = async (chain) => {
    let resp = await axios.get(chain.stakes);
    
    let boostArray = parseBoostAddresses(resp.data)
    
    //keep boosts that take moobifi as input
    return boostArray
        .filter(boost => boost.tokenAddress.toLocaleLowerCase() === chain.maxi.toLocaleLowerCase())
        .map(boost => boost.earnContractAddress);
}

const parseBoostAddresses = (boostFileString) => {
    let index = boostFileString.indexOf('[');
    let boosts = boostFileString.slice(index);
    boosts = boosts.replace(';','');
    boosts = boosts.replace(/,*;*\s*\n*$/, "");
    
    const govPoolABI= ''; //required to perform eval since json has object inside key inside
    
    let boostArray = [];

    try {
        boostArray = eval('(' + boosts + ')');
    } catch (err) {

        log.debug('Failed to parse boost file string');
        log.error(err);
        boostArray = [];
    }

    return boostArray;
}

module.exports = {
    getMooBifiBoostAddresses
}