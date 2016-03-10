#!/bin/bash
cd /app
apt-get update && rm -rf node_modules && npm cache clean && npm install && npm start
