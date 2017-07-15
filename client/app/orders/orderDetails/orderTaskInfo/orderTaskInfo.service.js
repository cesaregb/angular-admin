'use strict';

angular.module('processAdminApp')
  .factory('orderTaskInfo', function ($log, _) {
    let factory = {};

    let observerCallbacks = [];

    factory.registerObserverCallback = function (callback) {
      observerCallbacks.push(callback);
    };

    let notifyObservers = function () {
      angular.forEach(observerCallbacks, function (callback) {
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

      order.services = _.sortBy(order.services, (service) => {
        return service.idService;
      });
      order.services.forEach((service) => {
        service.serviceTasks = sortTasks(service.serviceTasks);
      });
      factory.order = order;
      notifyObservers();
    };

    function sortTasks(taskArray) {
      if (Boolean(taskArray) && taskArray.length > 0) {
        return _.sortBy(taskArray, function (itm) {
          return itm.sortingOrder;
        });
      }
      return [];

    }

    return factory;
  });
