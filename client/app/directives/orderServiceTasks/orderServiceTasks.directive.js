'use strict';

angular.module('processAdminApp')
  .directive('orderServiceTasks', function ($log, orderTaskInfo, _ ) {
    return {
      templateUrl: 'app/directives/orderServiceTasks/orderServiceTasks.html',
      restrict: 'EA',
      scope:{
        taskAction: '&taskAction'
      },
      link: function (scope, element, attrs) {
        scope.orderFinished = false;
        orderTaskInfo.registerObserverCallback(parseOrder);

        /**
         * entrypoint for observable.
         */
        function parseOrder(){
          // clean sections
          scope.sections = [];
          let nextTask = selectNextTask( orderTaskInfo.order.orderTasks );
          // if is "Servicio para ordenes" service...
          if (!Boolean(nextTask)){
            scope.orderFinished = true;
          } else if (Boolean(nextTask) && nextTask.idTask !== 1){
            // init scope for Order
            initScope(1);
          } else {
            if ( areServicesEnded() ){
              // Services completed, finish the order service auth
              let actionInfo = {
                task: nextTask.task,
                action: 2
              };
              scope.taskAction({actionInfo: actionInfo});
            }else{
              // init scope for services
              initScope(2);
            }
          }
        }

        function getEndedIfApplicable(nextTask, taskArray){
          let ended = null;
          if (!Boolean(nextTask) && Boolean(taskArray) && taskArray.length > 0){
            ended = taskArray[taskArray.length - 1].ended;
          }
          return ended;
        }

        /**
         * Init the scope for the directive
         * 1 = order
         * 2 = services
         * @param type
         */
        function initScope( type ){
          scope.sections = [];

          if (type == 1){ // Order
            let nextTask = selectNextTask( orderTaskInfo.order.orderTasks );
            let ended = getEndedIfApplicable(nextTask, orderTaskInfo.order.orderTasks);
            let obj = {
              title: orderTaskInfo.order.orderType,
              nextTask: nextTask,
              ended: ended,
              tasks: orderTaskInfo.order.orderTasks
            };
            scope.sections.push(obj);
          } else {
            // Service Information
            // there are possible multiple services...
            orderTaskInfo.order.services.forEach( (service) => {
              let nextTask = selectNextTask( service.serviceTasks );
              let ended = getEndedIfApplicable(nextTask, service.serviceTasks);
              let obj = {
                title: service.name,
                nextTask: nextTask,
                ended: ended,
                tasks: service.serviceTasks
              };
              scope.sections.push(obj);

            });
          }
        }

        /**
         * Select next task based on tasks
         * @param taskArray
         */
        function selectNextTask(taskArray){
          return _.find(taskArray, function (itm) {
            return itm.status == 0 || itm.status == 1;
          });
        }

        /**
         * check if [service] is completed
         * @returns {boolean}
         */
        function areServicesEnded() {
          let result = true;
          orderTaskInfo.order.services.forEach(function (service) {
            if (! isServiceEnded( service.serviceTasks ) ){
              result = false;
            }
          });
          return result;
        }

        /**
         * check if service is completed
         * @param taskArray
         * @returns {boolean}
         */
        function isServiceEnded(taskArray){
          if ( !Boolean(taskArray) || taskArray.length == 0 ){
            return true;
          }
          $log.info('[isServiceEnded] taskArray[taskArray.length - 1].status: ' + taskArray[taskArray.length - 1].status);
          return taskArray[taskArray.length - 1].status === 2;
        }

      }
    };
  });
