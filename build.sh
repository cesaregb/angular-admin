#!/bin/bash

#npm install --silent -g grunt-cli bower
#npm install -g grunt
#npm install

export SOD_SERVICES_DOMAIN=127.0.0.1
export SOD_SERVICES_PORT=8080
export SOD_SERVICES_USER=user
export SOD_SERVICES_PASSWORD=user
export SOD_SERVICES_URL="http://${SOD_SERVICES_DOMAIN}:${SOD_SERVICES_PORT}/api"

export PORT=9000

grunt serve
