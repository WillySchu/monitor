const monk = require('monk');
const cfg = require('./config.js');
const db = monk(cfg.mongodb.url)

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
