'use strict';

angular.module('processAdminApp')
  .directive('orderServiceTasks', function ($log, orderTaskInfo, _ ) {
    return {
      templateUrl: 'app/directives/orderServiceTasks/orderServiceTasks.html',
      restrict: 'EA',
      scope:{
        type: '@type',
        taskAction: '&taskAction'
      },
      link: function (scope, element, attrs) {
        scope.expendedArray = [];
        scope.title = 'Servicios';
        scope.taskArray = [];

        scope.$watch(function(){return orderTaskInfo.order;}, function(){
          if (Boolean(orderTaskInfo.order)){
            parseOrder();
          }
        });

        function parseOrder(){
          scope.title = 'Servicios';
          scope.taskArray = [];
          scope.expendedArray = [];

          if (parseInt(scope.type) === 1){
            // Order information
            orderTaskInfo.order.orderTasks = _.sortBy(orderTaskInfo.order.orderTasks, function (itm) {
              return itm.sortingOrder;
            });
            let nextTask = _.find(orderTaskInfo.order.orderTasks, function(itm){
              return itm.status == 0;
            });
            scope.title = 'Orden';
            let obj = {
              title: orderTaskInfo.order.orderType,
              nextTask: nextTask,
              tasks: orderTaskInfo.order.orderTasks
            };
            scope.expendedArray.push(true);
            scope.taskArray.push(obj);
          } else {
            // Service Information
            orderTaskInfo.order.services.forEach(function (service) {
              service.serviceTasks = _.sortBy(service.serviceTasks, function (itm) {
                return itm.sortingOrder;
              });
              let nextTask = _.find(service.serviceTasks, function(itm){
                return itm.status == 0;
              });
              let obj = {
                title: service.name,
                nextTask: nextTask,
                tasks: service.serviceTasks
              };
              scope.taskArray.push(obj);
              scope.expendedArray.push(true);
            });
          }

          // UI logic
          if (scope.expendedArray.length > 0){
            scope.expendedArray[0] = false;
          }

        }

      }
    };
  });
