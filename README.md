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

check mongodb server

check angular app

check marketing site

check refresh tokens

check node server

check quota usage

stretch: cloudwatch integration
