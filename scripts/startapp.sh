#!/bin/bash
DIR=/home/ubuntu
APP_DIR=/home/ubuntu/monitor
LOG_DIR=/home/ubuntu/logs
NODE=/usr/bin/node

if [ `pgrep node` ]; then
    node_process_id=$(pidof node)
    kill $node_process_id
    echo "Killed Node.js Process"
fi

# Get keys from s3
aws s3 cp s3://ms-codedeploy/authorized_keys /home/ubuntu/.ssh/authorized_keys --region us-west-2

# Make sure the keys have the correct permissions
chown ubuntu:ubuntu /home/ubuntu/.ssh/authorized_keys
chmod 600 /home/ubuntu/.ssh/authorized_keys

# Change ownership of repo
chown -R ubuntu:ubuntu $APP_DIR

# Do an NPM install and start node
cd $APP_DIR
npm install

# Get the configs repo
cd $DIR
git clone git@github.com:metricstory/config.git
chown -R ubuntu:ubuntu $DIR/config

# Get the libs repo
cd $DIR
git clone git@github.com:metricstory/libs.git
chown -R ubuntu:ubuntu $DIR/libs

# Install npm modules
cd $DIR/libs
npm install

# Link up the apps directory
mkdir -p $APP_DIR/node_modules/@metricstory
cd $APP_DIR/node_modules/@metricstory
ln -s $DIR/libs .

# Change ownership of repo
cd $DIR
chown -R ubuntu:ubuntu $DIR

MONITOR=true nohup node index.js 1 >> "$LOG_DIR/backfillWidgets.log" 2>&1 &
echo "Started backfillWidgets.js successfully"

exit 0
