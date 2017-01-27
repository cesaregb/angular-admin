'use strict';

angular.module('processAdminApp')
  .controller('SpecsValueModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {
      $scope.title = "Valores de Specs";

      factoryServices.getResources('specs').then(function(response){
        $scope.specs = response;
        if (Boolean($scope.formItem.idSpecsValues)) {
          $scope.changeSpecValueType();
        }else{
          $scope.formItem.idSpecs = response[0].idSpecs;
          $scope.formItem.type = 1;
          $scope.formItem.serviceIncrement = 0;
          $scope.formItem.specPrice = 0;
        }
      });
    };

    $scope.specs = [];
    $scope.supplyTypes = [];

    $scope.types = [{
      name: 'Valor',
      value: 1
    },{
      name: 'Tipo Consumible',
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
        return !Boolean($scope.formItem.idSupplyType) || $scope.formItem.idSupplyType == 0;
      }else{

        let result = Boolean($scope.formItem.value)
            && (
                ($scope.formItem.costType == 0 && $scope.formItem.serviceIncrement >= 0 )
                  ||
                ($scope.formItem.costType == 1 && $scope.formItem.specPrice >= 0 )
                );

        return !result;
      }
    };

    $scope.changeSpecValueType = function(){
      if ($scope.formItem.type == 2){
        factoryServices.getResources('supplyType').then((response)=>{
          $scope.supplyTypes = response;
        });
      }
    };

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
