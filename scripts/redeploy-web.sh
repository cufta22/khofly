#!/bin/bash

cd ..

# Set default INSTANCE_NAME to 'web-staging' if no argument is provided
INSTANCE_NAME=${1:-web-staging}

# Stop pm2 process
pm2 stop $INSTANCE_NAME

# Fetch latest code
git pull

# Build the web client
cd web
pnpm install
pnpm run build

# Start pm2 process
pm2 start $INSTANCE_NAME

systemctl reload nginx