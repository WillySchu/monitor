# Monitoring Service

## Install

Fork and clone!

```
npm install
```

## Run Locally

Make sure you have a redis and mongodb server running

```
redis-server &
mongod &
```

The launch the server and front end:

```
node index.js
cd fe
python -m SimpleHTTPServer
```

## Run EC2

Works pretty much the same, need to have env variable for node to look for the config in the correct place. Can simply pass it when starting the server. See startapp.sh script.

## Requirements:

### check mongodb server

Periodically ping the mongodb server to ensure that it's alive. Could set up a dumby collection to hit for this.

### check angular app



### check marketing site

Hit the marketing site to ensure that it's up

### check refresh tokens

Make sure the refresh token worker is alive and is actually, correctly refreshing auth tokens

### check node server

Hit a route on the node server for this. Probably create a new socket connection?

### check quota usage

Pull quota usage out of redis and display it to give an accurate view of how many requests have been used and how many are left, per company and overall.

### stretch: cloudwatch integration
