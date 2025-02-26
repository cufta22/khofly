#!/bin/bash

# Set default environment to 'staging' if no argument is provided
ENVIRONMENT=${1:-staging}

# Determine the PM2 instance name based on the environment argument
if [ "$ENVIRONMENT" == "staging" ]; then
  INSTANCE_NAME="web-staging"
elif [ "$ENVIRONMENT" == "production" ]; then
  INSTANCE_NAME="web-production"
else
  echo "Invalid environment specified. Use 'staging' or 'production'. Defaulting to 'staging'."
  INSTANCE_NAME="web-staging"
fi

# Stop pm2 process
pm2 stop $INSTANCE_NAME

# Fetch latest code
git pull

# Build the web client
cd web
pnpm install
pnpm run build

# Restart pm2 process
pm2 restart $INSTANCE_NAME

systemctl reload nginx