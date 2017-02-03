var db;

if (process.env.MONITOR) {
  const libs = require('@metricstory/libs');
  db = libs('db/monk');
} else {
  const monk = require('monk');
  db = monk('localhost');
}

col = db.get('logs');

function checkMongo() {
  return new Promise((resolve, reject) => {
    col.find().then(d => {
      resolve(d);
    })
    .catch(reject);
  })
}

module.exports.checkMongo = checkMongo;
