#!/bin/bash

if [ "${1}" = "build" ]
then
  docker build -t interactivelabs/process-admin -f Dockerfile .
else
  docker run -p 27017:27017 --name mongo-admin -d mongo
  docker run -p 9000:9000 --link mongo-admin:mongo -it interactivelabs/process-admin
fi
