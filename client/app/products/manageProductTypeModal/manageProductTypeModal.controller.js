'use strict';

angular.module('processAdminApp')
  .controller('ManageProductTypeModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log, _) {

    $scope.formItem = formItem;
    $scope.productTypesSource = [];
    $scope.selected = {};
    $scope.productTypes = [];

    this.init = function() {
      $scope.title = "Asignar Tipo de Producto";
      if (Boolean($scope.formItem)) {
        if (Boolean($scope.formItem.productTypes)){
            $scope.productTypes = $scope.formItem.productTypes;
        }
      }
      factoryServices.getResources('productType').then(function(response) {
        $scope.productTypesSource = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      var index = _.findIndex($scope.productTypes, function(element){
        return element.idProductType == item.idProductType;
      });
      if (index == -1){
        $scope.productTypes.push(item);
      }
    }

    $scope.deleteItem = function(deleteItem){
      var deleteIndex = _.findIndex($scope.productTypes, function(element){
        return element.idProductType == item.idProductType;
      });
      if (deleteIndex >= 0){
          $scope.productTypes.splice(deleteIndex, 1);
      }
    };

    $scope.okAction = function() {
      $scope.formItem.productTypes = $scope.productTypes;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
