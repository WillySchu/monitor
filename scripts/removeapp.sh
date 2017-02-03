#!/bin/bash
DIR=/home/ubuntu
APP_DIR=/home/ubuntu/monitor
CONFIG_DIR=/home/ubuntu/config
LIBS_DIR=/home/ubuntu/libs
NODE=/usr/bin/node

echo "Killed Node.js Process"
killall node

rm -fr $APP_DIR
rm -fr $CONFIG_DIR
rm -fr $LIBS_DIR

exit 0
