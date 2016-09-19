'use strict';

angular.module('processAdminApp')
  .controller('ViewServiceModalCtrl', function($scope, factoryServices, $uibModalInstance, service, $log) {

    this.init = function() {
      $scope.service = service;
    };

    this.init();

    $scope.okAction = function() {
      $uibModalInstance.dismiss('cancel');
    };

  });
