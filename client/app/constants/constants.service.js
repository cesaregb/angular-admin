'use strict';

angular.module('processAdminApp.constants')
  .factory('constants', function () {
    var factory = {};

    factory.LOCAL_API_ENDPOINT = "http://localhost:8080/api";
    factory.PROD_API_ENDPOINT = "http://52.7.139.88:8080/api";
    factory.API_ENDPOINT = "";

    return factory;
  });
