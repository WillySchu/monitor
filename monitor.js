class Monitor {
  constructor(timeout, check, alert) {
    this.timeout = timeout;
    this.check = check;
    this.alert = alert;
  }

  listen() {
    setInterval(() => {
      console.log(this.check);
      this.check()
        .then(this.alert)
        .catch(this.alert)
    }, this.timeout)
  }
}

module.exports = Monitor
