const WebSocketServer = require('websocket').server;
const http = require('http');

const Monitor = require('./monitor.js');
const checkGA = require('./rs.js').checkGA;
const checkInsights = require('./rs.js').checkInsights;

var alert;

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(404);
  res.end();
})

server.listen(8080, () => {
  console.log('Listening on port 8080');
})

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', req => {
  if (!originIsAllowed(req.origin)) {
    req.reject();
    console.log((new Date()) + ' Connection from origin ' + req.origin + ' rejected.');
    return;
  }

  const connection = req.accept('protocol', req.origin)
  console.log('connection accepted');

  alert = (t, arg) => {
    const res = {}
    res['service'] = t;
    res['status'] = arg;
    console.log(res);
    connection.sendUTF(JSON.stringify(res));
  }


  mg = new Monitor(1000, checkGA, alert.bind(this, 'ga'));
  ml = new Monitor(1000, checkInsights, alert.bind(this, 'insights'));
  ml.listen();
  mg.listen();
})
