'use strict';

angular.module('processAdminApp')
  .factory('factoryClients', function ($http, $q, API_ENDPOINT) {
    // Service logic
    // ...
    var factory = {};

    factory.getURL = function () {
      return "AQUI: " + API_ENDPOINT;
    };

    factory.getClients = function () {
         // console.log("TURACO_DEBUG - AJAX REQUEST GET: " + urlBase);
         lists = $http.get(API_ENDPOINT + "/clients");
      };

    var meaningOfLife = 42;

    // Public API here
    return factory;
  });
