'use strict';

angular.module('processAdminApp')
  .directive('orderServiceTasks', function () {
    return {
      templateUrl: 'app/directives/orderServiceTasks/orderServiceTasks.html',
      restrict: 'EA',
      scope:{
        type: '@type',
      },
      link: function (scope, element, attrs) {
        scope.task = {some: 'info'};

      }
    };
  });
