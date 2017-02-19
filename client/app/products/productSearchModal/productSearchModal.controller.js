'use strict';

angular.module('processAdminApp')
  .controller('ProductSearchModalCtrl', function ($scope, factoryServices, $uibModalInstance, $log, _, serviceType) {

    $scope.productInfo = null;
    $scope.productType = null;

    $scope.searchProducts = function(){
      let text = $scope.searchText;
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
        // get service type, because serviceType may not be complete since obj is different for creating order.
        factoryServices.getResourceById('serviceType', serviceType.idServiceType).then((st)=>{
          if (Boolean(st.productTypes) && st.productTypes.length > 0){
            let ids = [];
            st.productTypes.forEach(function(prodType){
              ids.push(prodType.idProductType);
            });

            // search products by service Type
            if (ids.length > 0){
              factoryServices.getProductsByProductTypes(ids).then((response) => {
                $scope.products = response;
              });
            }
          }
        });
      }

    };

    $scope.filterByType = function(){
      factoryServices.getProductsByType($scope.productType.idProductType).then((response)=>{
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
