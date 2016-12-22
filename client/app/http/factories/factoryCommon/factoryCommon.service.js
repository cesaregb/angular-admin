'use strict';

angular.module('processAdminApp')
  .factory('factoryCommon', function ($http, $q, messageHandler, $log, appContext) {

    var factory = {};

    factory.post = function( data, url ) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.post( url, data )
        .success(function(data, status, headers, config) {
          messageHandler.showSuccess('Action succesful!');
          deferred.resolve(data);
        }).error(function(response){
          messageHandler.showError('Error in action ' + response.message);
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
          messageHandler.showError('Error saving item: ' + response.message);
          deferred.reject(response);
        });
      return deferred.promise;
    }

    factory.get = function(url) {
      var deferred = $q.defer();
      url = appContext.appContextObject.sodEndpoint + url ;

      $http.get( url )
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).error(function(response){
          messageHandler.showError('Error getting data ' + response.message);
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

        }).error(function(error){
        messageHandler.showError('Error udating item: ' + error.message);
          deferred.reject(error);
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
        }).error(function(error){
        messageHandler.showError('"Error deleting: ' + error.message);
          deferred.reject(error);
        });

      return deferred.promise;
    };

    return factory;

  });
