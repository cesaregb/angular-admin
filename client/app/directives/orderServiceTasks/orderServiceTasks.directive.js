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
        initScope();

        orderTaskInfo.registerObserverCallback(parseOrder);
        //service now in control of updating foo

        function parseOrder(){
          initScope();
          if (parseInt(scope.type) === 1){
            processOrderTasks();
          } else {
            processServiceTasks();
          }
          if (Boolean(scope.taskArray[0]) && scope.taskArray.length > 0){
            scope.selectedTask = scope.taskArray[0];
          }

          // UI logic
          if (scope.expandedElementArray.length > 0){
            scope.expandedElementArray[0] = false;
          }
        }

        function processServiceTasks(){
          // Service Information
          // there are possible multiple services...
          orderTaskInfo.order.services.forEach(function (service) {
            service.serviceTasks = sortTasks(service.serviceTasks);
            let nextTask = selectNextTask( service.serviceTasks );
            let ended = getEndedIfApplicable(nextTask, service.serviceTasks);
            let obj = {
              title: service.name,
              nextTask: nextTask,
              ended: ended,
              tasks: service.serviceTasks
            };
            scope.taskArray.push(obj);
            scope.expandedElementArray.push(true);
          });
        }

        function processOrderTasks(){
          // Order information
          scope.title = 'Orden';
          orderTaskInfo.order.orderTasks = sortTasks(orderTaskInfo.order.orderTasks);
          let nextTask = selectNextTask( orderTaskInfo.order.orderTasks );
          let ended = getEndedIfApplicable(nextTask, orderTaskInfo.order.orderTasks);
          let obj = {
            title: orderTaskInfo.order.orderType,
            nextTask: nextTask,
            ended: ended,
            tasks: orderTaskInfo.order.orderTasks
          };
          scope.expandedElementArray.push(true);
          scope.taskArray.push(obj);
        }

        function getEndedIfApplicable(nextTask, taskArray){
          let ended = null;
          if (!Boolean(nextTask) && Boolean(taskArray) && taskArray.length > 0){
            ended = taskArray[taskArray.length - 1].ended;
          }
          return ended;
        }

        function selectNextTask(taskArray){
          return _.find(taskArray, function (itm) {
            return itm.status == 0 || itm.status == 1;
          });
        }

        function sortTasks(taskArray){
          return _.sortBy(taskArray, function (itm) {
            return itm.sortingOrder;
          });
        }

        function initScope(){
          scope.expandedElementArray = [];
          scope.title = 'Servicios';
          scope.taskArray = [];
        }

        scope.changeSubsection = function(index){
          for (var i = 0; i < 0; i++){
            scope.expandedElementArray[i] = true;
          }
          scope.expandedElementArray[index] = false;
        }

      }
    };
  });
