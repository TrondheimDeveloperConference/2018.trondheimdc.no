#!/bin/bash

tar -zxvf /tmp/dist.tar.gz -C /tmp/
sudo chown www-data:www-data -R /tmp/dist
sudo rm -rf /var/www/vhosts/2018.trondheimdc.no/httpdocs
sudo mv /tmp/dist /var/www/vhosts/2018.trondheimdc.no/httpdocs
rm /tmp/dist.tar.gz
rm /tmp/deploy.sh