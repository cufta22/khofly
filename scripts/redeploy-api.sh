#!/bin/bash

# Set default INSTANCE_NAME to 'api-staging' if no argument is provided
INSTANCE_NAME=${1:-api-staging}

# Stop pm2 process
pm2 stop $INSTANCE_NAME

# Fetch latest code
git pull

# Build the api
cd api
bun install
# bun run build

# Start pm2 process
pm2 start $INSTANCE_NAME

systemctl reload nginx