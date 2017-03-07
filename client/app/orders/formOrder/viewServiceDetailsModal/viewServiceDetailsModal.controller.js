'use strict';

angular.module('processAdminApp')
  .controller('ViewServiceDetailsModalCtrl', function($scope, factoryServices, $uibModalInstance, service, $log, _) {

    $scope.service = service;

    this.init = function() {
      //
    };

    this.init();

    $scope.okAction = function() {
      $uibModalInstance.close({});
    };

  });
