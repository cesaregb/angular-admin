'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

import config from '../../config/environment';
import http from 'http';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    // set process_admin token in config.

    // TODO handle perms by token and the role.
    config.authUserInfo.token = token;
    config.authUserInfo.role = user.role;

    var sodServicesEndpoint = 'http://' + config.sodInfo.serviceDomain + ':' + config.sodInfo.servicePort + '/api';

    // TODO how should we create the process_admin????
    var options = {
      host: config.sodInfo.serviceDomain,
      path: '/api/auth/app/process_admin',
      port: config.sodInfo.servicePort,
      auth: config.sodInfo.serviceUser + ':' + config.sodInfo.servicePassword,
      method: 'POST'
    };

    let callback = function(response) {
      let str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        let jsonCnt = JSON.parse(str);
        console.log('[BE Server auth] jsonCnt: ' + JSON.stringify(jsonCnt.token, null, 2));
        let sodAuthToken = jsonCnt.token;
        // set sod token
        config.authUserInfo.sodToken = sodAuthToken;

        res.json({
          token,
          sodAuthToken: sodAuthToken,
          sodServicesEndpoint: sodServicesEndpoint
        });
      });
    };

    var ask4Token = http.request(options, callback);
    //This is the data we are posting, it needs to be a string or a buffer
    ask4Token.write("no content expected");
    ask4Token.end();

  })(req, res, next)
});

export default router;
