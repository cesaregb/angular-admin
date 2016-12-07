#!/bin/bash

# APP=$(docker run -d -p 8080 app)
# PORT=$(docker port $APP 8080 | awk -F: '{print $2}')
# echo "Open http://localhost:$PORT/"

export SOD_SERVICES_URL=127.0.0.1
export SOD_SERVICES_PORT=8080
export SOD_SERVICES_USER=user
export SOD_SERVICES_PASSWORD=user

grunt serve
