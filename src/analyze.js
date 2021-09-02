const { Contract } = require('ethers');
const { getProvider, sleep } = require('./utils');
const { chains } = require('./chains');
const { abis } = require ('./abis');
const { log } = require('./log');
const { getMooBifiBoostAddresses } = require('./stakes');

async function analyze (hodlers) {
  log.info(`analyzing hodlers: ${hodlers.length}`);

  log.debug(`async analyzing chains`);
  const promises = [];
  for (let id in chains) {
    promises.push(analyzeChain(id, hodlers));
  }
  const results = await Promise.all(promises);
  log.debug(`chains analyzed`);

  log.debug(`merging results`);
  let balances = {};
  for (let i = 0; i < hodlers.length; i++) {
    const addr = hodlers[i];
    let balance = {}
    
    let idx = 0;
    for (let id in chains) {
      balance[id] = results[idx++][addr];
    }

    balances[addr] = balance;
  }
  log.debug(`results merged`);
  
  return balances;
}

async function analyzeChain (id, hodlers) {
  log.info(`analyzing chain: ${id}`);
  const chain = chains[id];

  log.debug('preparing aux vars');
  let provider = getProvider(chain.rpc);
  const multicall = new Contract(chain.multicall.address, abis.multicall, provider);
  const batch_size = chain.multicall.batch;
  const boosts = await getMooBifiBoostAddresses(chain);
  const targets = [chain.bifi, chain.rewards, chain.maxi, ...boosts];

  let maxi_pps = 1;
  if (chain.maxi != '0x0000000000000000000000000000000000000000') {
    log.debug('chain has a maxi vault');
    const maxi = new Contract(chain.maxi, abis.maxi, provider);
    maxi_pps = Number(await maxi.getPricePerFullShare()) / 1e18;
    log.debug(`maxi pricePerFullShare ${maxi_pps}`);
  }
  
  log.debug('fetching balances');
  const balances = {}; 
  for (let i = 0; i < hodlers.length; i += batch_size) {
    const addresses = hodlers.slice(i, i + batch_size);
  
    let results = [];
    try {
      log.debug(`${id} batch: [${i}-${i + batch_size} / ${hodlers.length}]`);
      results = await multicall.aggregate(addresses, targets, "balanceOf(address)");

    } catch (err) {
      log.error(err);
      
      try {
        provider = getProvider(chain.rpc);
      } catch (err) {
        log.error(err);
      }
      
      log.debug(`sleeping for ${chain.query.sleep}ms`);
      await sleep(chain.query.sleep);
      
      i -= batch_size;
      continue;
    }

    for (let j = 0; j < batch_size; j++) {
      const idx = i + j;
      if(idx >= hodlers.length) { break; }
      
      const bal = {
        bifi: Number(results[j * targets.length + 0]) / 1e18,
        rewards: Number(results[j * targets.length + 1]) / 1e18,
        maxi: Number(results[j * targets.length + 2]) / 1e18 * maxi_pps,
        boosts: 0
      }

      for (let k = 3; k < targets.length; k++) {
        bal.boosts += Number(results[j * targets.length + k]) / 1e18 * maxi_pps;
      }

      bal.total = bal.bifi + bal.rewards + bal.maxi + bal.boosts;
      
      balances[hodlers[idx]] = bal;
    }
    await sleep(chain.interval);
  }

  log.info(`chain analyzed: ${id}`);
  return balances;
}

module.exports = { analyze }