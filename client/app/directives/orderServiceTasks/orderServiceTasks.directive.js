'use strict';

angular.module('processAdminApp')
  .directive('orderServiceTasks', function ($log, orderTaskInfo, _) {
    return {
      templateUrl: 'app/directives/orderServiceTasks/orderServiceTasks.html',
      restrict: 'EA',
      scope: {
        taskAction: '&taskAction'
      },
      link: function (scope) {
        scope.orderFinished = false;
        orderTaskInfo.registerObserverCallback(parseOrder);

        /**
         * entrypoint for observable.
         */
        function parseOrder() {
          scope.sections = [];
          let nextTask = selectNextTask(orderTaskInfo.order.orderTasks);

          scope.orderFinished = true;
          if (Boolean(nextTask) && nextTask.idTask !== 1) {
            scope.orderFinished = false;
            initScope(1);
          } else {
            scope.orderFinished = false;
            if (areServicesEnded()) {
              let actionInfo = {
                task: nextTask.task,
                action: 2
              };
              scope.taskAction({actionInfo: actionInfo});
            } else {
              initScope(2);
            }
          }
        }

        function getEndedIfApplicable(nextTask, taskArray) {
          let ended = null;
          if (!Boolean(nextTask) && Boolean(taskArray) && taskArray.length > 0) {
            ended = taskArray[taskArray.length - 1].ended;
          }
          return ended;
        }

        /**
         * Init the scope for the directive
         * 1 = order
         * 2 = services
         */
        function initScope(taskType) {
          const orderKey = 1;
          const serviceKey = 2;
          scope.sections = [];

          if (taskType === orderKey) { // Order
            let nextTask = selectNextTask(orderTaskInfo.order.orderTasks);
            let ended = getEndedIfApplicable(nextTask, orderTaskInfo.order.orderTasks);
            let obj = {
              title: orderTaskInfo.order.orderType,
              nextTask: nextTask,
              ended: ended,
              description: orderTaskInfo.order.orderType,
              tasks: orderTaskInfo.order.orderTasks
            };
            scope.sections.push(obj);

          } else if (taskType === serviceKey) {
            orderTaskInfo.order.services.forEach((service) => {
              let nextTask = selectNextTask(service.serviceTasks);
              let ended = getEndedIfApplicable(nextTask, service.serviceTasks);
              let obj = {
                title: service.name,
                nextTask: nextTask,
                ended: ended,
                description: service.serviceDescription,
                tasks: service.serviceTasks
              };
              scope.sections.push(obj);
            });
          }
        }

        function selectNextTask(taskArray) {
          return _.find(taskArray, function (itm) {
            return itm.status === 0 || itm.status === 1;
          });
        }

        function areServicesEnded() {
          let result = true;
          orderTaskInfo.order.services.forEach(function (service) {
            if (!isServiceEnded(service.serviceTasks)) {
              result = false;
            }
          });
          return result;
        }

        function isServiceEnded(taskArray) {
          if (!Boolean(taskArray) || taskArray.length === 0) {
            return true;
          }
          return taskArray[taskArray.length - 1].status === 2;
        }

      }
    };
  });
