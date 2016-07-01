'use strict';

angular.module('processAdminApp')
  .controller('ServiceCategoryModalCtrl', function($scope, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Service Category";
      if (Boolean($scope.formItem)) {
        // placeholder
      }
    };

    this.init();

    /*******  FORM  */
    $scope.formItemFields = [
      {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        required: true
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Description',
        required: true
      }
    }];

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
