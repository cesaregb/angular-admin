'use strict';

angular.module('processAdminApp')
  .controller('TaskTypeModalCtrl', function($scope, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {
      $scope.title = "Form Task Type";
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
    },{
      "type": "checkbox",
      "key": "ordersOnly",
      "templateOptions": {
        "label": "Solo en Ordenes"
      }
    }];

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
