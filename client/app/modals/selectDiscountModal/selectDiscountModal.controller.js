'use strict';

angular.module('processAdminApp')
  .controller('SelectDiscountModalCtrl', function ($scope, factoryServices, $uibModalInstance, something) {

    $scope.discounts = [
      {name: "Edredones", id: 1, amount: 20},
      {name: "Pronto Pago", id: 2, amount: 5},
      {name: "Planchado Martes", id: 2, amount: 14},
      {name: "6to Lavado", id: 3, amount: 70}
    ];

    this.init = function () {
    };

    this.init();

    $scope.selectDiscount = function (discount) {
      $uibModalInstance.close(discount);
    };

    $scope.preSelectDiscount = function (discount) {
      $scope.selectedDiscount = discount;
    };

    $scope.okAction = function () {
      $uibModalInstance.close($scope.selectedDiscount);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  });
