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
    factory.saveCalendarRouteCallback = function(dataInput, callback){
      this.saveCalendarRoute(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    // method used for transitional updates.
    factory.updateCalendarRouteCallback = function(dataInput, callback){
      this.updateCalendarRoute(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    //********** Stop CRUD
    var stopsURI = "/stops";
      factory.getStops = function () {
       return factoryCommon.get(stopsURI);
    };
    factory.saveStop = function ( data ) {
       return factoryCommon.save(data, stopsURI);
    };
    factory.updateStop = function ( data ) {
       return factoryCommon.put(data, stopsURI);
    };

    // method used for transitional updates.
    factory.saveStopCallback = function(dataInput, callback){
      this.saveStop(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    // method used for transitional updates.
    factory.updateStopCallback = function(dataInput, callback){
      this.updateStop(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    return factory;

  });
