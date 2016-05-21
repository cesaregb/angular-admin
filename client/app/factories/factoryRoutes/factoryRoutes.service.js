'use strict';

angular.module('processAdminApp')
  .factory('factoryRoutes', function (factoryCommon, noty) {

    var factory = {};

    //********** Routes CRUD
    var routesURI = "/routes";
    factory.getAllRoutes = function () {
       return factoryCommon.get(routesURI);
    };
    factory.getRouteById = function (routeId) {
       return factoryCommon.get("/routes/" + routeId);
    };
    factory.saveRoute = function (data) {
       return factoryCommon.save(data, routesURI);
    };
    factory.updateRoute = function (data) {
       return factoryCommon.put(data, routesURI);
    };

    //********** CalendarRoute CRUD
    var calendarRoutesURI = "/calendarRoutes";
      factory.getCalendarRoutes = function () {
       return factoryCommon.get(calendarRoutesURI);
    };
    factory.saveCalendarRoute = function ( data ) {
       return factoryCommon.save(data, calendarRoutesURI);
    };
    factory.updateCalendarRoute = function ( data ) {
       return factoryCommon.put(data, calendarRoutesURI);
    };

    // method used for transitional updates.
    factory.saveCalendarRouteCallback = function(phone, callback){
      this.saveCalendarRoute(phone).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    // method used for transitional updates.
    factory.updateCalendarRouteCallback = function(phone, callback){
      this.updateCalendarRoute(phone).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    return factory;

  });
