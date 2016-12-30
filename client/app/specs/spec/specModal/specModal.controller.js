'use strict';

angular.module('processAdminApp')
  .controller('SpecModalCtrl', function($scope, $uibModalInstance, formItem, $log, formlyForms) {

    $scope.formItem = formItem;

    this.init = function() {
      $scope.formItemFields = formlyForms.specFields;
      $scope.title = "Form Spec Type";

      if (Boolean($scope.formItem.name)) {
        // placeholder
      }else{
        formItem.optional = 0;
        formItem.isPrimary = 0; // hardcoded.. was not used... yet
        formItem.max_qty = 0;
      }
    };

    this.init();

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
