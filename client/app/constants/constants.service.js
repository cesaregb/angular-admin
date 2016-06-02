'use strict';

angular.module('processAdminApp.constants')
  .factory('constants', function () {
    var factory = {};

    factory.LOCAL_API_ENDPOINT = "http://localhost:8080/api";
    factory.PROD_API_ENDPOINT = "http://tersuslavanderia.com:8080/api";
    factory.API_ENDPOINT = "";

    return factory;
  });
