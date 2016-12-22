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
  console.log("[respondWithResult] init");
  return function(entity) {
    console.log("[respondWithResult.function] entity: " + JSON.stringify(entity, null, 2));
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  console.log("[handleEntityNotFound] init" );

  return function(entity) {
    if (!entity) {
      console.log("[handleEntityNotFound.function] entity not found returning 404!" );
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  console.log("[handleError] init ");

  return function(err) {
    console.log("[handleError.function] err: " + JSON.stringify(err, null, 2));
    res.status(statusCode).send(err);
  };
}

function getMenu(){
  return sodServices.sodGet('/app-utils/menu');
}

function getStore() {
  let deferred = Q.defer();
  console.log("[getStore] init ");

  sodServices.sodGet('/stores').then( (stores) => {
    console.log("[getStore] response from sodServices.sodGet completed ");
    deferred.resolve(stores[0]);

  }, (err) => {
    console.log('[getStore] err: ' + JSON.stringify(err, null, 2));
    deferred.reject(err)

  });

  return deferred.promise;
}

export function getAppContext(){
  let deferred = Q.defer();

  console.log('[getAppContext] init ');

  let result = {
    sodEndpoint : config.sodInfo.serviceUrl
  };

  // if token exist...
  Q.fcall(sodServices.getSODToken)
    .then(getMenu)
    .then(function(menu){
        console.log('[getAppContext] getMenu completed ');
        result.sodToken = config.sodInfo.token;
        result.menu = menu;
        return getStore();
      })
    .then(function(store){
        console.log('[getAppContext] getStore completed ');
        result.store = store;
        deferred.resolve(result);

      })
    .catch(function(err){
        // error
        deferred.reject(err);
      })
    .done();

  return deferred.promise;
}

// Gets a single AppContext from the DB
export function show(req, res) {
  console.log('[show] init');

  // validate if user is logged...
  console.log('[show] config.token: ' + config.token);
  if (config.token === 'NA'){
    console.error('[show] Token non existing, reject request ');
    return res.status(401).end();
  }else{
    return getAppContext()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

export function logout(req, res) {
  console.log('[logout] init');
  config.token = 'NA';
  config.sodInfo.token = 'NA';
  return res.status(200).end();
}

