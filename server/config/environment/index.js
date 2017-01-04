'use strict';

let path = require('path');
let _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
let all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: true,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'process-admin-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  mongoDocker: {
    uri: 'mongodb://mongo/processadmin-dev'
    // uri: 'mongodb://192.168.99.100:27017/processadmin-dev'
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  //SOD (Java) service information.
  sodInfo: {
    serviceDomain: process.env.SOD_SERVICES_DOMAIN = process.env.SOD_SERVICES_DOMAIN || '127.0.0.1',
    servicePort: process.env.SOD_SERVICES_PORT = process.env.SOD_SERVICES_PORT || '8080',
    serviceUser: process.env.SOD_SERVICES_USER = process.env.SOD_SERVICES_USER || 'user',
    servicePassword: process.env.SOD_SERVICES_PASSWORD = process.env.SOD_SERVICES_PASSWORD || 'user',
    serviceUrl: process.env.SOD_SERVICES_URL = process.env.SOD_SERVICES_URL || 'http://127.0.0.1:8080/api',
  },

  authUserInfo: {
    token: 'NA',
    sodToken: 'NA',
    role: 'NA'
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
// Local declared values will be replaced by the "environment" one.

let exportInfo = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});

console.log('[environment] exportInfo: ' + exportInfo.port );

if (Boolean(process.env.DOCKER)){
  console.log("****** " + process.env.NODE_ENV +  " - Changing the MONGO uri.... exportInfo: " + exportInfo.mongoDocker.uri);
  exportInfo.mongo.uri = exportInfo.mongoDocker.uri;
}else{
  console.log("****** SAME OLD MONGO!!");
}


module.exports = exportInfo
