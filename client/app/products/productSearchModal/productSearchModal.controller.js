'use strict';

angular.module('processAdminApp')
  .controller('ProductSearchModalCtrl', function ($scope, factoryServices, $uibModalInstance, $log, _, serviceType) {

    $scope.productInfo = null;
    $scope.productType = null;

    $scope.searchProducts = function(){
      var text = $scope.searchText;
      factoryServices.getProductsByName(text).then(function(response){
        $scope.products = response;
      });
    };

    $scope.productTypes = [];
    $scope.init = function(){
      $scope.searchText = "";
      $scope.products = [];

      factoryServices.getResources('productType').then(function(result){
        $scope.productTypes = result;
      });

      if (Boolean(serviceType)){
        factoryServices.getResourceById('serviceType', serviceType.idServiceType).then(function (response) {
          serviceType = response;
          // TODO fix me remove extra call.
          var ids = [];
          if (Boolean(serviceType.productTypes) && serviceType.productTypes.length > 0){
            serviceType.productTypes.forEach(function(item){
              ids.push(item.idProductType);
            });

            if (ids.length > 0){
              factoryServices.getProductsByProductTypes(ids).then(function(response){
                $scope.products = response;
              });
            }
          }
        });
      }

    };

    $scope.filterByType = function(){
      factoryServices.getProductsByType($scope.productType.idProductType).then(function(response){
        $scope.products = response;
      });
    };

    $scope.init();

    $scope.preSelectItem = function(product){
      $scope.productInfo = product;
    };

    $scope.selectItemAction = function(product){
      $scope.productInfo = product;
      $scope.selectItem();
    };

    $scope.selectItem = function(){
      $uibModalInstance.close($scope.productInfo);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
