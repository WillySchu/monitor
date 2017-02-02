const Monitor = require('./monitor.js');
const checkSemaphore = require('./rs.js');

function alert(arg) {
  // send an alert somewhere
  console.log(arg)
}
m = new Monitor(1000, checkSemaphore, alert);
m.listen();
