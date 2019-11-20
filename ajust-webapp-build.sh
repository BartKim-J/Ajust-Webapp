#!/bin/bash
docker rm $(docker ps -a -q)

docker build -t bartkim07120/ajust-webapp .
docker push bartkim07120/ajust-webapp

