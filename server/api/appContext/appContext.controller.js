/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/appContext              ->  show
 * GET     /api/appContext/:role        ->  show
 */

'use strict';

import Q from 'q';
import config from '../../config/environment';
let sodServices = require('../../components/restHelper/sodServices.js');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    console.log("[respondWithResult.function] entity: " + JSON.stringify(entity, null, 2));
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      console.log("[handleEntityNotFound.function] entity not found returning 404!");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log("[handleError.function] err: " + JSON.stringify(err, null, 2));
    res.status(statusCode).send(err);
  };
}

function getMenu(role) {
  return function () {
    console.log('[getMenu] getting: > /app-utils/menu/' + role + ' < ')
    return sodServices.sodGet('/app-utils/menu/' + role);
  }
}

function getStore() {
  let deferred = Q.defer();
  sodServices.sodGet('/stores').then((stores) => {
    deferred.resolve(stores[0]);

  }, (err) => {
    deferred.reject(err)

  });

  return deferred.promise;
}

function getPriceAdjustments() {
  let deferred = Q.defer();
  sodServices.sodGet('/stores').then((stores) => {
    deferred.resolve(stores[0]);

  }, (err) => {
    deferred.reject(err)

  });

  return deferred.promise;
}

export function getAppContext() {
  let deferred = Q.defer();
  let result = {
    sodEndpoint: config.sodInfo.serviceUrl
  };

  Q.fcall(sodServices.getSODToken)
    .then(getMenu(config.authUserInfo.role))
    .then(function (menu) {
      result.sodToken = config.authUserInfo.sodToken;
      result.menu = menu;
      return getStore();
    })
    .then(function (store) {
      result.store = store;
      return getStore();
    })
    .then(function (store) {
      result.store = store;
      deferred.resolve(result);
    })
    .catch(function (err) {
      deferred.reject(err);
    })
    .done();

  return deferred.promise;
}

// Gets a single AppContext from the DB
export function show(req, res) {
  console.log('[show] init');

  // validate if user is logged...
  if (config.authUserInfo.token === 'NA') {
    console.error('[show] Token non existing, reject request ');
    return res.status(401).json({message: "Please login"}).end();
  } else {
    return getAppContext()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

export function logout(req, res) {
  console.log('[logout] init');
  config.authUserInfo.token = 'NA';
  config.authUserInfo.role = 'NA';
  config.authUserInfo.sodToken = 'NA';
  return res.status(200).end();
}

