'use strict';

angular.module('processAdminApp')
  .factory('orderTaskInfo', function () {
    let factory = {};
    factory.order = {
      client: '',
      orderType: '',
      orderTasks: [],
      services: []
    };

    factory.setOrder = function (order) {
      factory.order = order;
    };

    return factory;
  });
