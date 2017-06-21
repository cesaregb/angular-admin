'use strict';

angular.module('processAdminApp')
  .directive('taskDetails', function ($log) {
    return {
      templateUrl: 'app/directives/taskDetails/taskDetails.html',
      restrict: 'EA',
      scope: {
        contextObj: '=contextObj',
        taskAction: '&taskAction'
      },
      link: function (scope, element, attrs) {
        scope.isCollapsed = true;
        let actionInfo = {};
        if (Boolean(scope) && Boolean(scope.contextObj) && Boolean(scope.contextObj.nextTask)){
          actionInfo = {
            task: scope.contextObj.nextTask.task
          };
        }

        scope.fireTaskAction = function(action){
          actionInfo.action = action;
          scope.taskAction()({actionInfo: actionInfo});
        };

      }

    };
  });
