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
        let actionInfo = {};
        if (Boolean(scope) && Boolean(scope.contextObj) && Boolean(scope.contextObj.nextTask)) {
          actionInfo = {
            task: scope.contextObj.nextTask.task
          };
        } else {
          actionInfo = {
            task: {}
          }
        }

        scope.fireTaskAction = function (action) {
          actionInfo.action = action;
          scope.taskAction()({actionInfo: actionInfo});
        };
      }
    };
  });
