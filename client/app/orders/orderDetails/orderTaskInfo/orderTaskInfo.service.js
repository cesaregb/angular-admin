'use strict';

angular.module('processAdminApp')
  .factory('orderTaskInfo', function () {
    let factory = {};

    var observerCallbacks = [];

    //register an observer
    factory.registerObserverCallback = function(callback){
      observerCallbacks.push(callback);
    };

    //call this when you know 'foo' has been changed
    let notifyObservers = function(){
      angular.forEach(observerCallbacks, function(callback){
        callback(null, factory.order);
      });
    };


    factory.order = {
      client: '',
      orderType: '',
      orderTasks: [],
      services: []
    };

    factory.setOrder = function (order) {
      factory.order = order;
      notifyObservers();
    };

    return factory;
  });
