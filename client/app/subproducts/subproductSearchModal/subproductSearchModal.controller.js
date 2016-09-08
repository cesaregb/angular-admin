'use strict';

angular.module('processAdminApp')
  .controller('SubproductSearchModalCtrl', function ($scope, factoryServices, $uibModalInstance) {

    $scope.subproductInfo = null;

    $scope.searchSubproducts = function(){
      var text = $scope.searchText;
      factoryServices.getSubproductsByName(text).then(function(response){
        $scope.subproducts = response;
      });
    };

    $scope.init = function(){
      $scope.searchText = "";
      $scope.subproducts = [];
    }

    $scope.init();

    $scope.preSelectItem = function(subproduct){
      $scope.subproductInfo = subproduct;
    }

    $scope.selectItemAction = function(subproduct){
      $scope.subproductInfo = subproduct;
      $scope.selectItem();
    }

    $scope.selectItem = function(){
      $uibModalInstance.close($scope.subproductInfo);
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
