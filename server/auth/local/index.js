'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

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

    //BE token
    var sodServiceUrl = process.env.SOD_SERVICES_URL = process.env.SOD_SERVICES_URL || '127.0.0.1';
    var sodServicePort = process.env.SOD_SERVICES_PORT = process.env.SOD_SERVICES_PORT || '8080';
    var sodServiceUser = process.env.SOD_SERVICES_USER = process.env.SOD_SERVICES_USER || 'user';
    var sodServicePassword = process.env.SOD_SERVICES_PASSWORD = process.env.SOD_SERVICES_PASSWORD || 'user';

    var options = {
      host: sodServiceUrl,
      path: '/api/auth/app/process_admin',
      port: sodServicePort,
      auth: sodServiceUser + ':' + sodServicePassword,
      method: 'POST'
    };

    var callback = function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        var jsonCnt = JSON.parse(str);
        console.log('[BE Server auth] jsonCnt: ' + JSON.stringify(jsonCnt.token, null, 2));
        var sodAuthToken = jsonCnt.token;
        res.json({
          token,
          sodAuthToken: sodAuthToken
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
