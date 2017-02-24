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
        let actionInfo = {
          task: scope.contextObj.nextTask
        };

        scope.startTask = function () {
          actionInfo.action = 0;
          fireTaskAction(actionInfo);
        };

        scope.endTask = function () {
          actionInfo.action = 1;
          fireTaskAction(actionInfo);
        };

        function fireTaskAction(actionInfo){
          scope.taskAction()({actionInfo: actionInfo});
        }

      }

    };
  });
