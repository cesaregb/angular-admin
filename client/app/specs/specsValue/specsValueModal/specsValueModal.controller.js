'use strict';

angular.module('processAdminApp')
  .controller('SpecsValueModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {
      $scope.title = "Form Specs Value";

      factoryServices.getResources('spec').then(function(response){
        $scope.specs = response;
        if (Boolean($scope.formItem.idSpecsValues)) {
          $scope.changeSpecValueType();
        }else{
          $scope.formItem.idSpecs = response[0].idSpecs;
          $scope.formItem.type = 1;
        }
      });
    };

    $scope.specs = [];
    $scope.productTypes = [];

    $scope.types = [{
      name: 'Valor',
      value: 1
    },{
      name: 'Tipo Producto',
      value: 2
    }];

    $scope.costTypes = [{
      name: 'Incremento %',
      value: 0
    },{
      name: 'Precio',
      value: 1
    }];

    this.init();

    $scope.invalidForm = function(){
      if ($scope.formItem.type == 2){
        return !Boolean($scope.formItem.idProductType) || $scope.formItem.idProductType == 0;
      }else{
        var result = Boolean($scope.formItem.value)
            && (
                ($scope.formItem.costType  == 0 && Boolean($scope.formItem.serviceIncrement) )
                  ||
                ($scope.formItem.costType == 1 && Boolean($scope.formItem.specPrice) )
                );

        return !result;
      }
    }

    $scope.changeSpecValueType = function(){
      if ($scope.formItem.type == 2){
        factoryServices.getResources('productType').then(function(response){
          $scope.productTypes = response;
        });
      }
    }

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
