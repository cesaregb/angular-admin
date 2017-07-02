'use strict';

import express from "express";
import passport from "passport";
import {signToken} from "../auth.service";
import config from "../../config/environment";

let router = express.Router();
let sodServices = require('../../components/restHelper/sodServices.js');

function cleanSodToken() {
  config.authUserInfo.sodToken = {
    token: 'NA',
    sodToken: 'NA',
    role: 'NA'
  };
}

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    const error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    cleanSodToken();
    let token = signToken(user._id, user.role);

    // TODO handle perms by token and the role.
    config.authUserInfo.token = token;
    config.authUserInfo.role = user.role;

    sodServices.getSODToken().then((sodAuthToken) => {
      config.authUserInfo.sodToken = sodAuthToken;
      return res.json({
        token,
        sodAuthToken: sodAuthToken,
        sodServicesEndpoint: config.sodInfo.serviceUrl
      });
    }, () => {
      return res.status(401).json({message: 'Error authenticating with SOD Services.'});
    });
  })(req, res, next)
});

export default router;
