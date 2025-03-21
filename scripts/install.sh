#!/bin/bash

# Everything up to date
apt update && apt upgrade

# Dependencies
echo -e "\e[32mInstalling all dependencies\e[0m"
apt install nodejs npm build-essential libssl-dev unzip nginx certbot python3-certbot-nginx ffmpeg

echo -e "\e[32mInstalling yt-dlp\e[0m"
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/bin/yt-dlp
chmod a+rx /usr/bin/yt-dlp

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
cp .env.example .env.local
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
cp .env.example .env.local
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
echo -e "\e[32mCreating Nginx config files\e[0m"
cd /etc/nginx/sites-available/

# Config for web client
echo "server {
    server_name example.com;

    root /root/web;

    location / {
        # Proxy to pm2 server on 3001 for web

        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}" > web

# Config for bun api
echo "server {
    server_name example.com;

    root /root/api;

    location / {
        # Proxy to pm2 server on 4000 for api

        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header Origin $http_origin;
        proxy_cache_bypass $http_upgrade;
    }


    listen 80;
}" > api

ln -s /etc/nginx/sites-available/web /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/