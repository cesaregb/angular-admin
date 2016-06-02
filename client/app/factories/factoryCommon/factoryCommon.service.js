'use strict';

angular.module('processAdminApp')
  .factory('factoryCommon', function ($http, $q, constants, noty) {

    var factory = {};

    factory.post = function( data, url ) {
      var deferred = $q.defer();
      url = constants.API_ENDPOINT + url ;

      $http.post( url, data )
        .success(function(data, status, headers, config) {
          noty.showNoty({
            text: "Action succesful!",
            ttl: 1000 * 2,
            type: "success"
          });
          deferred.resolve(data);
        }).error(function(response){
          noty.showNoty({
            text: "Error in action ",
            ttl: 1000 * 2,
            type: "warning"
          });
          deferred.reject(response);
        });
      return deferred.promise;
    }

    factory.save = function( data, url ) {
      var deferred = $q.defer();
      url = constants.API_ENDPOINT + url ;

      $http.post( url, data )
        .success(function(data, status, headers, config) {
          noty.showNoty({
            text: "Item saved succesful ",
            ttl: 1000 * 2,
            type: "success"
          });
          deferred.resolve(data);
        }).error(function(response){
          noty.showNoty({
            text: "Error saving item... ",
            ttl: 1000 * 2,
            type: "warning"
          });
          deferred.reject(response);
        });
      return deferred.promise;
    }

    factory.get = function(url) {
      var deferred = $q.defer();
      url = constants.API_ENDPOINT + url ;

      $http.get( url )
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).error(function(response){
          noty.showNoty({
            text: "Error getting data ",
            ttl: 1000 * 2,
            type: "warning"
          });
          deferred.reject(response);
        });
      return deferred.promise;
    }

    factory.put = function ( data, url ) {
      var _this = this;
      var deferred = $q.defer();
      url = constants.API_ENDPOINT + url ;

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          noty.showNoty({
            text: "Item updated ",
            ttl: 1000 * 2,
            type: "success" // warning
          });

          deferred.resolve(data);

        }).error(function(error){
          noty.showNoty({
            text: "Error updating... ",
            ttl: 1000 * 2,
            type: "warning"
          });

          deferred.reject(error);
        });

      return deferred.promise;
    }

    factory.delete = function ( data, url ) {
      var _this = this;
      var deferred = $q.defer();
      url = constants.API_ENDPOINT + url ;

      $http.delete(url, data)
        .success(function(data, status, headers, config) {
          noty.showNoty({
            text: "Item deleted ",
            ttl: 1000 * 2,
            type: "success" // warning
          });

          deferred.resolve(data);

        }).error(function(error){
          noty.showNoty({
            text: "Error deleting... ",
            ttl: 1000 * 2,
            type: "warning"
          });

          deferred.reject(error);
        });

      return deferred.promise;
    }

    return factory;

  });
