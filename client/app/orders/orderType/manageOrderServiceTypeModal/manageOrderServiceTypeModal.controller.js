'use strict';

angular.module('processAdminApp')
  .controller('ManageOrderServiceTypeModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;
    $scope.serviceTypes = [];
    $scope.orderServiceTypes = [];

    this.init = function() {
      if (Boolean($scope.formItem) && Boolean($scope.formItem.serviceTypes)) {
          $scope.orderServiceTypes = $scope.formItem.serviceTypes;
      }
      factoryServices.getResources('serviceType').then(function(response) {
        $scope.serviceTypes = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      if (indexOfElement(item) == -1) {
        var selected = {};
        selected = item;
        selected.idOrderType = $scope.formItem.idOrderType;
        $scope.orderServiceTypes.push(selected);
      }
    }

    $scope.deleteItem = function(dItem) {
      var deleteIndex = indexOfElement(dItem);
      if ( deleteIndex >= 0 ) {
        $scope.orderServiceTypes.splice(deleteIndex, 1);
      }
    };

    // helper
    function indexOfElement(findItem) {
      var index = -1;
      for (var i = 0; i < $scope.orderServiceTypes.length; i++) {
        if ($scope.orderServiceTypes[i].idServiceType == findItem.idServiceType) {
          index = i;
        }
      }
      return index;
    };

    // form actions...
    $scope.okAction = function() {
      $scope.formItem.serviceTypes = $scope.orderServiceTypes;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
