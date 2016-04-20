'use strict';

angular.module('processAdminApp')
  .factory('factoryClients', function ($http, $q, API_ENDPOINT, noty) {

    function post( data, url ) {
      var deferred = $q.defer();
      url = API_ENDPOINT + url ;

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

    function get(url) {
      var deferred = $q.defer();
      url = API_ENDPOINT + url ;

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

    function put ( data, url ) {
      var _this = this;
      var deferred = $q.defer();
      url = API_ENDPOINT + url ;

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

    var factory = {};

    //********** Clients CRUD
    factory.getClients = function () {
       return get("/clients");
    };
    factory.getClientByID = function (clientId) {
       return get("/clients/" + clientId);
    };
    factory.saveClient = function (data) {
       return post(data, "/clients");
    };
    factory.updateClient = function (data) {
       return put(data, "/clients");
    };

    //********** Phone Numbers CRUD
    factory.getPhoneNumbers = function () {
       return get("/phone-number");
    };
    factory.savePhoneNumber = function ( data ) {
       return post(data, "/phone-number");
    };
    factory.updatePhoneNumber = function ( data ) {
       return put(data, "/phone-number");
    };

    return factory;
  });
