const Redis = require('redis');
const queueNamespace = process.env.NODE_QUEUE_NAMESPACE;

rcfg = {}
rcfg.host = 'redis.db.metricstory.me';

const WORKER_SEMAPHORE = `${queueNamespace}.ms.semaphore.ga.etl.worker`;

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

var redis = Redis.createClient(rcfg)

console.log(WORKER_SEMAPHORE);

setInterval(() => {
  getSemaphore(WORKER_SEMAPHORE)
    .then(res => {
      console.log(res);
      console.log('><><><><');
    })
    .catch(err => {
      console.log(err);
    })
}, 1000)
