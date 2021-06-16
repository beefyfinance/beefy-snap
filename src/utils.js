const { ethers} = require('ethers');
const { log } = require('./log');

const getProvider = (rpcs) => { 
  log.debug('randomizing provider');
  const idx = Math.floor(Math.random() * rpcs.length);
  const provider = new ethers.providers.JsonRpcProvider(rpcs[idx]);
  log.debug(`provider: ${rpcs[idx]}`);
  return provider;
}

const getAddressFromTopic = (topic) => {
  return `0x${topic.substring(26).toLowerCase()}`;
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = { 
  getProvider,
  getAddressFromTopic,
  sleep
}