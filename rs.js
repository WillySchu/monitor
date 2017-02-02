const Redis = require('redis');
const cfg = require('./config.js');
const Monitor = require('./monitor.js');
const queueNamespace = process.env.NODE_QUEUE_NAMESPACE;

const WORKER_SEMAPHORE = `${queueNamespace}.ms.semaphore.insight.worker`;

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
  console.log(namespace);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>');
  return new Promise((resolve, reject) => {
    getSemaphore(namespace)
    .then(res => {
      console.log(res);
      if (res === true) return resolve(res);
      reject('No worker alive');
    })
    .catch(reject)
  })
}

module.exports = checkSemaphore.bind(this, WORKER_SEMAPHORE)
