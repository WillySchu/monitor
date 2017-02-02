const monk = require('monk');
const cfg = require('./config.js');
const db = monk(cfg.mongodb.url)

col = db.get('logs');
