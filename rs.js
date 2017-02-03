var redis;
var queueNamespace;

if (process.env.MONITOR) {
  const libs = require('@metricstory/libs');
  redis = require('db/redis');
  queueNamespace = process.env.NODE_QUEUE_NAMESPACE === undefined ? libs.cfg.env : process.env.NODE_QUEUE_NAMESPACE;
} else {
  const Redis = require('redis');
  queueNamespace = process.env.NODE_QUEUE_NAMESPACE === undefined ? 'will' : process.env.NODE_QUEUE_NAMESPACE;
  const redisConf = {
    host: 'localhost',
    port: '6379'
  }
  redis = Redis.createClient(redisConf);
}


const Monitor = require('./monitor.js');

const GA_SEMAPHORE = `${queueNamespace}.ga`;
const INSIGHTS_SEMAPHORE = `${queueNamespace}.insights`;

var getSemaphore = function (key) {
  return new Promise(function (resolve, reject) {
    redis.get(key, (e, o) => {
      resolve(typeof o === "string");
    });
  })
}

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
