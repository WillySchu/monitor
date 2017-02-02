const Monitor = require('./monitor.js');
const checkGA = require('./rs.js').checkGA;
const checkInsights = require('./rs.js').checkInsights;

function alert(arg) {
  // send an alert somewhere
  console.log(arg)
}
mg = new Monitor(1000, checkGA, alert);
ml = new Monitor(1000, checkInsights, alert);
ml.listen();
mg.listen();
