'use strict';

angular.module('processAdminApp.constants')
  .factory('constants', function () {
    var factory = {};

    factory.LOCAL_API_ENDPOINT = "http://localhost:8080/api";
    factory.DEV_API_ENDPOINT = "http://52.6.82.228:8080/api";
    factory.PROD_API_ENDPOINT = "http://52.7.139.88:8080/api";
    factory.API_ENDPOINT = "";

    // creation of services.
    factory.ORDER = {};

    factory.store = 1;

    return factory;
  });
