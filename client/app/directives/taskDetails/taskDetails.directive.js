'use strict';

angular.module('processAdminApp')
  .directive('taskDetails', function ($log) {
    return {
      templateUrl: 'app/directives/taskDetails/taskDetails.html',
      restrict: 'EA',
      scope: {
        task: '=task'
      },
      link: function (scope, element, attrs) {
        $log.info('[link] $scope.message: ' + scope.message);
        scope.isCollapsed = true;
      }

    };
  });
