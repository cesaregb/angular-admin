'use strict';

angular.module('processAdminApp')
  .factory('factoryRoutes', function (factoryCommon, noty) {

    var factory = {};

    //********** Routes CRUD
    factory.getAllRoutes = function () {
       return factoryCommon.get("/routes");
    };
    factory.getRouteById = function (routeId) {
       return factoryCommon.get("/routes/" + routeId);
    };
    factory.saveRoute = function (data) {
       return factoryCommon.save(data, "/routes");
    };
    factory.updateRoute = function (data) {
       return factoryCommon.put(data, "/routes");
    };

    return factory;

  });
