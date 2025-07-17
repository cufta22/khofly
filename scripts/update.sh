#!/bin/bash

echo -e "\e[32m-- Stop all pm2 instances\e[0m"
pm2 stop all

echo -e "\e[32m-- Fetch the latest code\e[0m"
git pull

echo -e "\e[32m-- Build and Run web client\e[0m"
cd web
pnpm install
pnpm run build

echo -e "\e[32m-- Build and Run API\e[0m"
cd ../api
bun install
# bun run build

echo -e "\e[32m-- Build and Run PV\e[0m"
cd ../pv
bun install
# bun run build

echo -e "\e[32m-- Start all pm2 instances\e[0m"
pm2 start all

echo -e "\e[32m-- Restarting nginx\e[0m"
systemctl reload nginx

echo -e "\e[32m-- Done\e[0m"
