const Redis = require('redis');
const cfg = require('./config.js');
const Monitor = require('./monitor.js');
const queueNamespace = process.env.NODE_QUEUE_NAMESPACE;

const GA_SEMAPHORE = `${queueNamespace}.ms.semaphore.insight.worker`;
const INSIGHTS_SEMAPHORE = `${queueNamespace}.ms.semaphore.ga.etl.worker`;

var newConnection = function () {
  var client = Redis.createClient(redisConf);
  return client;
}

var getSemaphore = function (key) {
  return new Promise(function (resolve, reject) {
    redis.get(key, (e, o) => {
      resolve(typeof o === "string");
    });
  })
}

var redis = Redis.createClient(cfg.redis)

function checkSemaphore(namespace) {
  return new Promise((resolve, reject) => {
    getSemaphore(namespace)
    .then(res => {
      if (res === true) return resolve(res);
      reject('No worker alive');
    })
    .catch(reject)
  })
}

module.exports.checkGA = checkSemaphore.bind(this, GA_SEMAPHORE)
module.exports.checkInsights = checkSemaphore.bind(this, INSIGHTS_SEMAPHORE)