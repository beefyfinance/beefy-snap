const { existsSync, writeFileSync, unlinkSync, readFileSync } = require('fs');

const { log } = require('./log');
const { track } = require('./track');
const { analyze } = require('./analyze');
const { LOCK_FILE, META_FILE, HODL_FILE, SNAP_FILE, BIFI_FILE } = require('./constants');

function reduceBalance(balance) {
  try {
    return balance.bsc.total +
      balance.heco.total + 
      balance.polygon.total + 
      balance.fantom.total + 
      balance.avax.total +
      balance.harmony.total +
      balance.arbitrum.total;

  } catch (err) {
    log.warn(err);
    return 0;
  }
}

async function main () {
  log.info('beefy-snap start');

  try {
    if (existsSync(LOCK_FILE)) {
      log.error('another instance is already running');
      process.exit(-1);
    }

    log.debug('locking mutex');
    writeFileSync(LOCK_FILE, Date.now().toString());
    log.debug('mutex locked');

    let metadata = { hodlers: 0 };
    let hodlers = [];
  
    if (existsSync(META_FILE)) {
      log.debug('metadata found');

      try {
        log.debug('parsing metadata');
        metadata = JSON.parse(readFileSync(META_FILE));
        hodlers = JSON.parse(readFileSync(HODL_FILE));
        log.debug('metadata parsed');

      } catch (err) {
        log.warn('parsing failed. ignoring corrupt metadata');
        metadata = { hodlers: 0 };
        hodlers = []; 
      }
    } else {
      log.debug('metadata not found');
    }

    if (metadata.hodlers !== hodlers.length) {
      log.warn('mismatched hodlers count. ignoring corrupt metadata');
      metadata = { hodlers: 0 };
      hodlers = [];
    }
    
    hodlers = await track(metadata, hodlers);
    const balances = await analyze([...hodlers]);

    log.debug('writing full snapshot');
    writeFileSync(SNAP_FILE, JSON.stringify(balances));

    log.debug('filtering empty addresses');
    const reduced = {};
    for(const [addr, balance] of Object.entries(balances)) {
      let total = reduceBalance(balance);
      if(total <= 0 || total === NaN) { continue; }
      reduced[addr] = total.toString();
    }

    writeFileSync(BIFI_FILE, JSON.stringify(reduced));
    log.info('snapshot complete');
  } catch (err) {
    log.error(err);
    throw err;
  }  

  if (existsSync(LOCK_FILE)) {
    log.debug('unlocking mutex');
    unlinkSync(LOCK_FILE);
    log.debug('mutex unlocked');
  }
}

main();