#!/bin/bash

cd ..

# Fetch latest code
git pull origin staging


# Build the api
cd api
bun install
# bun run build

# Restart pm2 process
pm2 restart api-staging