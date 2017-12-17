#!/bin/bash

tar -zcvf dist.tar.gz dist
scp dist.tar.gz marvin@connect.trondheimdc.no:/tmp/
cd ..
rm -rf dist*