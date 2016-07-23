'use strict';

angular.module('processAdminApp')
  .controller('ManageSpecsModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;
    $scope.specs = [];
    $scope.selected = {};
    $scope.serviceTypeSpecs = [];

    this.init = function() {
      $scope.title = "Asignar Subproductos";
      if (Boolean($scope.formItem)) {
        if (Boolean($scope.formItem.serviceTypeSpecs)){
            $scope.serviceTypeSpecs = $scope.formItem.serviceTypeSpecs;
        }

        // placeholder
      }
      factoryServices.getResources('spec').then(function(response) {
        $scope.specs = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      if (indexOfElement(item) == -1){
        var selectedSpec = {};
        selectedSpec.spec = item;
        selectedSpec.idServiceType = $scope.formItem.idServiceType;
        $scope.serviceTypeSpecs.push(selectedSpec);
      }
    }

    $scope.deleteItem = function(deleteItem){
      var deleteIndex = indexOfElement(deleteItem.spec);
      if (deleteIndex >= 0){
          $scope.serviceTypeSpecs.splice(deleteIndex, 1);
      }
    };

    function indexOfElement(findItem){
      var index = -1;
      for (var i = 0; i < $scope.serviceTypeSpecs.length; i++){
        if ($scope.serviceTypeSpecs[i].spec.idSpecs == findItem.idSpecs){
          index = i;
        }
      }
      return index;
    };

    $scope.okAction = function() {
      $scope.formItem.serviceTypeSpecs = $scope.serviceTypeSpecs;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
