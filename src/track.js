const { writeFileSync } = require('fs');
const { ethers } = require('ethers');
const { getProvider, getAddressFromTopic, sleep } = require('./utils');
const { chains } = require('./chains');
const { log } = require('./log');
const { META_FILE, HODL_FILE } = require('./constants');

async function track (metadata, hodlers) {
  log.info(`tracking hodlers`);

  let set = new Set(hodlers);
  for (let id in chains) {
    log.info(`tracking chain: ${id}`);
    set = await trackChain(id, metadata, set);
    log.info(`chain tracked: ${id}`);
  }
  return set;
}

async function trackChain (id, metadata, hodlers) {
  const chain = chains[id];
  const meta = metadata[id];
  let provider = getProvider(chain.rpc);

  const blocks = {
    first: meta ? meta.block : chain.query.start,
    last: await provider.getBlockNumber()
  }
  blocks.from = blocks.first;
  log.debug(`first block ${blocks.first}`);
  log.debug(`last block ${blocks.last}`);
  
  const topic = ethers.utils.id("Transfer(address,address,uint256)");
  log.debug(`topic: ${topic}`);

  const set = new Set(hodlers);
  log.debug(`cached hodlers: ${set.size}`);

  while (blocks.from < blocks.last) {
    blocks.to = blocks.from + chain.query.limit;
    if (blocks.to > blocks.last) { 
      blocks.to = blocks.last; 
    }
    log.debug(`fetching logs [${blocks.from} - ${blocks.to}]`);
    
    let logs = []
    try {
      logs = await provider.getLogs({
        address: chain.bifi,
        fromBlock: blocks.from,
        toBlock: blocks.to,
        topics: [topic]
      });
    } catch (err) {
      log.error(err);
      
      try {
        provider = getProvider(chain.rpc);
      } catch (err) {
        log.error(err);
      }

      log.debug(`sleeping for ${chain.query.sleep}ms`);
      await sleep(chain.query.sleep);
      continue;
    }

    log.debug(`fetched logs: ${logs.length}`);
    logs.forEach((log) => {
      set.add(getAddressFromTopic(log.topics[1]));
      set.add(getAddressFromTopic(log.topics[2]));
    });

    metadata[id] = { block: blocks.to }
    metadata.hodlers = set.size;
    log.debug(`hodlers: ${set.size}`);
    
    writeFileSync(META_FILE, JSON.stringify(metadata));
    writeFileSync(HODL_FILE, JSON.stringify([...set]));
    
    blocks.from = blocks.to;
    await sleep(chain.interval);
  }

  return set;
}

module.exports = { track }