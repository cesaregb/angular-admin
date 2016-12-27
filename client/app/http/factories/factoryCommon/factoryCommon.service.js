'use strict';

angular.module('processAdminApp')
  .factory('factoryCommon', function ($http, $q, messageHandler, $log, appContext, $httpParamSerializer) {

    var factory = {};

    factory.post = function( data, url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.post( url, data )
        .success(function(data, status, headers, config) {
          messageHandler.showSuccess('Action succesful!');
          deferred.resolve(data);
        }).error(function(response){
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error in action ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.patch = function( data, url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.patch( url, data )
        .success(function(data, status, headers, config) {
          messageHandler.showSuccess('Action succesful!');
          deferred.resolve(data);
        }).error(function(response){
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error in action ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.save = function( data, url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.post( url, data )
        .success(function(data, status, headers, config) {
          messageHandler.showSuccess('Item saved succesful ');
          deferred.resolve(data);
        }).error(function(response){
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error in action ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.get = function(url, obj) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;
      // logic for query params...
      let queryParams = '';
      if (Boolean(obj)){
        queryParams = '?' + $httpParamSerializer(obj);
      }
      url += queryParams;

      $http.get( url )
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).error(function(response){
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error in action ' + message);
          deferred.reject(response);
        });
      return deferred.promise;
    };

    factory.put = function ( data, url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          messageHandler.showSuccess('Item updated ');
          deferred.resolve(data);

        }).error(function(response){
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error in action ' + message);
          deferred.reject(response);
        });

      return deferred.promise;
    };

    factory.delete = function ( url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.delete(url)
        .success(function(data, status, headers, config) {
          messageHandler.showSuccess('Item deleted');
          deferred.resolve(data);
        }).error(function(response){
          let message = '';
          if(Boolean(response) && Boolean(response.message)){
            message = response.message;
          }
          messageHandler.showError('Error in action ' + message);
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return factory;

  });
