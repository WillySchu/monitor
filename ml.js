// deployed ---
// const libs = require('@metricstory/libs');
// const db = require('db/monk');
// end deployed ---


// local ---
const monk = require('monk');
const db = monk('localhost');
// end local ---

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
