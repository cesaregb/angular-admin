'use strict';

angular.module('processAdminApp')
  .controller('ManageSubproductTypeModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log, _) {

    $scope.formItem = formItem;
    $scope.subproductTypesSource = [];
    $scope.selected = {};
    $scope.subproductTypes = [];

    this.init = function() {
      $scope.title = "Asignar Tipo de Subproducto";
      if (Boolean($scope.formItem)) {
        if (Boolean($scope.formItem.subproductTypes)){
            $scope.subproductTypes = $scope.formItem.subproductTypes;
        }
      }
      factoryServices.getResources('subproductType').then(function(response) {
        $scope.subproductTypesSource = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      var index = _.findIndex($scope.subproductTypes, function(element){
        return element.idSubproductType == item.idSubproductType;
      });
      if (index == -1){
        $scope.subproductTypes.push(item);
      }
    }

    $scope.deleteItem = function(deleteItem){
      var deleteIndex = _.findIndex($scope.subproductTypes, function(element){
        return element.idSubproductType == item.idSubproductType;
      });
      if (deleteIndex >= 0){
          $scope.subproductTypes.splice(deleteIndex, 1);
      }
    };

    $scope.okAction = function() {
      $scope.formItem.subproductTypes = $scope.subproductTypes;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
