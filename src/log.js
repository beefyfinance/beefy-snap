const log = require('loglevel');

const prefix = {
  TRACE: 'TRC',
  DEBUG: 'DBG',
  INFO: 'INF',
  WARN: 'WRN',
  ERROR: 'ERR'
}

const factory = log.methodFactory;
log.methodFactory = function (name, level, logger) {
  const fn = factory(name, level, logger);
  return function (msg) {
    fn(`[${new Date().toISOString()}] ${prefix[name.toUpperCase()]}: ${msg}`);
  };
};
log.setLevel(process.env.LOG_LEVEL || 'trace');

module.exports = { log }