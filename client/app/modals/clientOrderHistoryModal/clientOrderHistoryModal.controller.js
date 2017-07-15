'use strict';

angular.module('processAdminApp')
  .controller('ClientOrderHistoryModalCtrl', function($scope, factoryServices, $uibModalInstance, orders, client, $state) {

    $scope.orders = orders;
    $scope.client = client;

    this.init = function() { };

    this.init();

    $scope.openOrder = function(order){
      $state.go('orders.orderDetails', {order: order}, {reload: true});
      $uibModalInstance.dismiss('cancel');
    };

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };


  });
