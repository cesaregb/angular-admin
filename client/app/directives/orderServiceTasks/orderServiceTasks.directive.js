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

        orderTaskInfo.registerObserverCallback(parseOrder);
        //service now in control of updating foo

        function parseOrder(){

          let nextTask = selectNextTask( orderTaskInfo.order.orderTasks );
          // if is "Servicio para ordenes" service...
          if (!Boolean(nextTask)){
            // no more task in order = Order finished
            $log.info('[Order Info] : 0');
          } else if (Boolean(nextTask) && nextTask.idTask !== 1){
            // init scope with order task
            $log.info('[Order Info] : 1');
            initScope(1);
          } else {
            if ( areServicesEnded() ){
              $log.info('[Order Info] : 2');
              // services completed, finish order tasks

            }else{
              // get services next tasks
              $log.info('[Order Info] : 3');
              initScope(2);
            }

          }
        }

        function processServiceTasks(){
          // Service Information
          // there are possible multiple services...
          orderTaskInfo.order.services.forEach(function (service) {
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
            $log.info('[initScope] orderTaskInfo.order.services: ' + orderTaskInfo.order.services.length);

            // Service Information
            // there are possible multiple services...
            orderTaskInfo.order.services.forEach( (service) => {

              let nextTask = selectNextTask( service.serviceTasks );
              let ended = getEndedIfApplicable(nextTask, service.serviceTasks);

              $log.info('[initScope] nextTask: ' + JSON.stringify(nextTask, null, 2));

              let obj = {
                title: service.name,
                nextTask: nextTask,
                ended: ended,
                tasks: service.serviceTasks
              };
              scope.sections.push(obj);

            });
          }
          $log.info('[initScope] scope.sections: ' + JSON.stringify(scope.sections, null, 2));
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
