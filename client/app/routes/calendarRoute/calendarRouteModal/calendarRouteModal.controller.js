'use strict';

angular.module('processAdminApp')
  .controller('CalendarRouteModalCtrl', function($scope, $uibModalInstance, calendarRoute, $log) {

    $scope.calendarRoute = calendarRoute;

    this.init = function() {
      $scope.title = "New route calendar";
      if ($scope.calendarRoute.day != null) {
        $scope.title = "Edit route calendar";
      }else{
        $scope.calendarRoute.day = 1;
      }
    };

    this.init();

    /*******  FORM  */
    $scope.calendarRouteFields = [{
      key: 'time',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Starting Time',
        required: true
      }
    }, {
      key: 'day',
      type: 'select',
      templateOptions: {
        label: 'Type',
        options: [{
          "name": "Monday",
          "value": 1
        }, {
          "name": "Tuesday",
          "value": 2
        }, {
          "name": "Wednesday",
          "value": 3
        }, {
          "name": "Thursday",
          "value": 4
        }, {
          "name": "Friday",
          "value": 5
        }, {
          "name": "Saturday",
          "value": 6
        }, {
          "name": "Sunday",
          "value": 7
        }]
      }
    }];

    $scope.savePhone = function() {
      $uibModalInstance.close($scope.calendarRoute);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
