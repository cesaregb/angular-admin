'use strict';

angular.module('processAdminApp')
  .controller('OrderInfoModalCtrl', function($scope, factoryServices, $uibModalInstance, injectData, $log) {

    $scope.order = injectData;

    this.init = function() {
      $log.info('[init] $scope.order: ' + JSON.stringify($scope.order, null, 2));
    };

    this.init();

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };


  });
