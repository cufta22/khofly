#!/bin/bash

echo -e "\e[32m-- Stop all pm2 instances\e[0m"
pm2 stop all


echo -e "\e[32m-- Start all pm2 instances\e[0m"
pm2 start all

echo -e "\e[32m-- Restarting nginx\e[0m"
systemctl reload nginx

echo -e "\e[32m-- Done\e[0m"
