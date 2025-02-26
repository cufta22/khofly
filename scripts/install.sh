#!/bin/bash

# Everything up to date
apt update && apt upgrade

# Dependencies
echo -e "\e[32mInstalling all dependencies\e[0m"
apt install nodejs npm build-essential libssl-dev unzip nginx certbot python3-certbot-nginx

echo -e "\e[32mInstalling nvm\e[0m"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22

echo -e "\e[32mInstalling pnpm\e[0m"
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=10.0.0 sh -

echo -e "\e[32mInstalling pm2\e[0m"
npm install pm2 -g
source ~/.bashrc

echo -e "\e[32mInstalling Bun\e[0m"
curl -fsSL https://bun.sh/install | bash

# Web
echo -e "\e[32mBuild and Run web client\e[0m"
cd web
pnpm install
pnpm run build
echo "module.exports = {
  apps : [{
    name: 'web',
    script: 'pnpm',
    args: 'run start',
    env: {
        PORT: 3001
    }
  }]
};" > ecosystem.config.cjs
pm2 start

# Api
echo -e "\e[32mBuild and Run API\e[0m"
cd ../api
bun install
echo "module.exports = {
  apps : [{
    name: 'api',
    script: 'bun',
    args: 'run start'
  }]
};" > ecosystem.config.js
pm2 start

# Nginx


