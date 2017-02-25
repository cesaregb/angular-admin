'use strict';

angular.module('processAdminApp')
  .controller('ManageSpecsModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log, _) {

    $scope.formItem = formItem;
    $scope.allSpecs = [];
    $scope.selected = {};
    $scope.specs = [];

    this.init = function() {
      $scope.title = "Asignar Specs";
      if (Boolean($scope.formItem)) {
        if (Boolean($scope.formItem.specs)){
            $scope.specs = $scope.formItem.specs;
        }
      }

      factoryServices.getResources('specs').then(function(response) {
        $scope.allSpecs = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item) {
      if (indexOfElement(item) == -1){
        let selectedSpec = item;
        selectedSpec.idServiceType = $scope.formItem.idServiceType;
        $scope.specs.push(selectedSpec);
      }
    };

    $scope.deleteItem = function(deleteItem){
      let deleteIndex = indexOfElement(deleteItem);
      if (deleteIndex >= 0){
          $scope.specs.splice(deleteIndex, 1);
      }
    };

    function indexOfElement(findItem){
      return _.findIndex($scope.specs, function (itm) {
        return (itm.idSpecs == findItem.idSpecs)
      });
    }

    $scope.okAction = function() {
      $scope.formItem.specs = $scope.specs;
      $uibModalInstance.close($scope.formItem);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
