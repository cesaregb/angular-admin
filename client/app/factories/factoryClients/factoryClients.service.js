'use strict';

angular.module('processAdminApp')
  .factory('factoryClients', function ($http, $q, API_ENDPOINT) {

    function post(data) {
      var deferred = $q.defer();
      var url = API_ENDPOINT + "/clients" ;

      $http.post( url, data )
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).error(function(response){
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function put ( data ) {
      var deferred = $q.defer();
      var url = API_ENDPOINT + "/clients" ;

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).error(function(response){
          deferred.reject(response);
        });

      return deferred.promise;
    }

    var factory = {};


    //********** Clients CRUD
    factory.getClients = function () {
       lists = $http.get(API_ENDPOINT + "/clients");
    };
    factory.saveClient = function (data) {
       return post(data);
    };
    factory.updateClient = function (data) {
       return put(data);
    };

    //********** Phone Numbers CRUD
    factory.getPhoneNumbers = function () {
       lists = $http.get(API_ENDPOINT + "/phone-number");
    };
    factory.savePhoneNumber = function ( data ) {
       return post(data);
    };
    factory.updatePhoneNumber = function ( data ) {
       return put(data);
    };


    return factory;
  });
