'use strict';

angular.module('processAdminApp')
  .factory('factoryCommon', function ($http, $q, messageHandler, $log, appContext, $httpParamSerializer) {

    let factory = {};

    factory.post = function( data, url ) {
      let deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.post( url, data )
        .then(function(response) {
          messageHandler.showSuccess('Accion Copleta');
          deferred.resolve(response.data);
        }).catch(function(response){
          response = response.data;
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error en accion [favor de tomar nota] ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.patch = function( data, url ) {
      let deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.patch( url, data )
        .then(function(response) {
          messageHandler.showSuccess('Accion Copleta');
          deferred.resolve(response.data);
        },function(response){
          response = response.data;
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error en accion [favor de tomar nota] ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.save = function( data, url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.post( url, data )
        .then(function(response) {
          messageHandler.showSuccess('Item saved succesful ');
          deferred.resolve(response.data);
        }).catch(function(response){
          response = response.data;
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error en accion [favor de tomar nota] ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.get = function(url, obj) {
      let deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;
      // logic for query params...
      let queryParams = '';
      if (Boolean(obj)){
        queryParams = '?' + $httpParamSerializer(obj);
      }
      url += queryParams;

      $http.get( url )
        .then(function(response) {
          deferred.resolve(response.data);
        },function(response){
          response = response.data;
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error en accion [favor de tomar nota] ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.put = function ( data, url ) {
      let deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.put(url, data)
        .then(function(response) {
          messageHandler.showSuccess('Campo modificado ');
          deferred.resolve(response.data);

        },function(response){
          response = response.data;
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error en accion [favor de tomar nota] ' + message);
          deferred.reject(response);
        });

      return deferred.promise;
    };

    factory.delete = function ( url ) {
      let deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.delete(url)
        .then(function(response) {
          messageHandler.showSuccess('Item deleted');
          deferred.resolve(response.data);
        },function(response){
          response = response.data;
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error en accion [favor de tomar nota] ' + message);
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return factory;

  });
