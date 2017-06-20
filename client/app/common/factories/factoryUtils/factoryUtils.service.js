'use strict';

angular.module('processAdminApp')
  .factory('factoryUtils', function (factoryCommon, noty) {

    var factory = {};

    var utilsURI = '/app-utils';
    var menuUri = '/menu';
    factory.getMenu = function () {
       return factoryCommon.get(utilsURI + menuUri);
    };
    factory.getMenuByAccessLevel = function (accessLevel) {
       return factoryCommon.get(utilsURI + menuUri + '/' + accessLevel);
    };

    return factory;

  });
