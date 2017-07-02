'use strict';

angular.module('processAdminApp')
  .controller('ProductSearchModalCtrl', function ($scope, factoryServices, $uibModalInstance, $log, _, serviceType, products) {

    $scope.productInfo = null;
    $scope.productType = null;

    $scope.searchProducts = function () {
      let text = $scope.searchText;
      factoryServices.getProductsByName(text).then(function (response) {
        $scope.products = response;
      });
    };

    $scope.productTypes = [];
    $scope.init = function () {
      $scope.searchText = "";
      $scope.products = (Boolean(products)) ? products : [];

      factoryServices.getResources('productType').then(function (result) {
        $scope.productTypes = result;
      });
    };

    $scope.filterByType = function () {
      factoryServices.getProductsByType($scope.productType.idProductType).then((response) => {
        $scope.products = response;
      });
    };

    $scope.init();

    $scope.preSelectItem = function (product) {
      $scope.productInfo = product;
    };

    $scope.selectItemAction = function (product) {
      $scope.productInfo = product;
      $scope.selectItem();
    };

    $scope.selectItem = function () {
      $uibModalInstance.close($scope.productInfo);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
