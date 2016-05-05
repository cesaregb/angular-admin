#!/bin/bash

APP=$(docker run -d -p 8080 app)
PORT=$(docker port $APP 8080 | awk -F: '{print $2}')
echo "Open http://localhost:$PORT/"
