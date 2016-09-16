'use strict';

angular.module('processAdminApp')
  .controller('SubproductSearchModalCtrl', function ($scope, factoryServices, $uibModalInstance, $log) {

    $scope.subproductInfo = null;
    $scope.subproductType = null;

    $scope.searchSubproducts = function(){
      var text = $scope.searchText;
      factoryServices.getSubproductsByName(text).then(function(response){
        $scope.subproducts = response;
      });
    };

    $scope.subproductTypes = [];
    $scope.init = function(){
      $scope.searchText = "";
      $scope.subproducts = [];

      factoryServices.getResources('subproductType').then(function(result){
        $scope.subproductTypes = result;
      });

    };

    $scope.filterByType = function(){
      factoryServices.getSubproductsByType($scope.subproductType.idSubproductType).then(function(response){
        $scope.subproducts = response;
      });
    };

    $scope.init();

    $scope.preSelectItem = function(subproduct){
      $scope.subproductInfo = subproduct;
    };

    $scope.selectItemAction = function(subproduct){
      $scope.subproductInfo = subproduct;
      $scope.selectItem();
    };

    $scope.selectItem = function(){
      $uibModalInstance.close($scope.subproductInfo);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
