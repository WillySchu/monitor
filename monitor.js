class Monitor {
  constructor(timeout, check, alert) {
    this.timeout = timeout;
    this.check = check;
    this.alert = alert;
  }

  listen() {
    setInterval(() => {
      this.check()
        .then(alert)
        .catch(alert)
    }, timeout)
  }
}

module.exports = Monitor
