class Monitor {
  constructor(timeout, check, alert) {
    this.timeout = timeout;
    this.check = check;
    this.alert = alert;
  }

  listen() {
    setInterval(() => {
      this.check()
        .then(this.alert)
        .catch(this.alert)
    }, this.timeout)
  }
}

module.exports = Monitor
