#!/bin/bash

#npm install --silent -g grunt-cli bower
#npm install -g grunt
#npm install

export SOD_SERVICES_USER=user
export SOD_SERVICES_PASSWORD=user
export SOD_INTERNAL_SERVICES_URL="http://127.0.0.1:8080/api"
export SOD_SERVICES_URL="http://127.0.0.1:8080/api"
export PORT=9000


function exportProd(){
    echo "Loading prod variables..."
    propertiesFile=".env"
    echo "{build.sh} Sourcing file ${propertiesFile} ..."
    cat ${propertiesFile} | sed '/^$/! s/^/export /' > export.properties
    source export.properties
    echo "{build.sh} ********** export.properties [init]"
    cat export.properties
    echo "{build.sh} ********** export.properties [end]"
}

if [ "${1}" = "build" ]
then
  if [[ "${2}" = "prod" ]]; then
    exportProd
  fi
  bower install
  grunt build
  cd dist
  npm start
else
  grunt serve
fi



