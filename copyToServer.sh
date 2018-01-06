#!/bin/bash

tar -zcvf dist.tar.gz dist
scp dist.tar.gz marvin@connect.trondheimdc.no:/tmp/
scp deploy.sh marvin@connect.trondheimdc.no:/tmp/
rm -rf dist*