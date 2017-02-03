// deployed ---
// const libs = require('@metricstory/libs');
// const redis = require('db/redis');
// const queueNamespace = process.env.NODE_QUEUE_NAMESPACE === undefined ? libs.cfg.env : process.env.NODE_QUEUE_NAMESPACE;
// end deployed ---

// local ---
const Redis = require('redis');
const queueNamespace = process.env.NODE_QUEUE_NAMESPACE === undefined ? 'will' : process.env.NODE_QUEUE_NAMESPACE;
const redisConf = 'localhost';
var redis = Redis.createClient(redisConf)
// end local ---

const Monitor = require('./monitor.js');

const GA_SEMAPHORE = `${queueNamespace}.ga`;
const INSIGHTS_SEMAPHORE = `${queueNamespace}.insights`;

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
