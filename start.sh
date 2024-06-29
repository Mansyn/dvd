#!/bin/bash

# Start MongoDB
mongod --bind_ip_all --fork --logpath /var/log/mongodb.log --dbpath ~/data/db

# Wait a few seconds to ensure MongoDB starts up
sleep 15

# Start the Express server
node server.js
