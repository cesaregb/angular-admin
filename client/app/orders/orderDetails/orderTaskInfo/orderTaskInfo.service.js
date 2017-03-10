'use strict';

angular.module('processAdminApp')
  .factory('orderTaskInfo', function ($log, _) {
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
      order.orderTasks = sortTasks(order.orderTasks);
      order.services = _.sortBy(order.services, (service)=>{return service.idService;});
      order.services.forEach( (service) => {
        service.serviceTasks = sortTasks(service.serviceTasks);
      });
      factory.order = order;
      notifyObservers();
    };

    function sortTasks(taskArray){
      return _.sortBy(taskArray, function (itm) {
        return itm.sortingOrder;
      });
    }

    return factory;
  });
