#!/bin/bash

# Fetch latest code
git pull

# Build the web client
cd web
pnpm install
pnpm run build

# Restart pm2 process
pm2 restart web-production
pm2 restart web-staging