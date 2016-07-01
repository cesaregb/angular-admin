'use strict';

angular.module('processAdminApp')
  .controller('SpecModalCtrl', function($scope, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Spec Type";
      if (Boolean($scope.formItem.name)) {
        // placeholder
      }else{
        formItem.optional = 0;
        formItem.max_qty = 0;
      }
    };

    this.init();

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
      key: 'max_qty',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Max Qty',
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
      key: 'optional',
      type: 'select',
      templateOptions: {
        label: 'Optional',
        options: [{
          "name": "No",
          "value": 0
        }, {
          "name": "Yes",
          "value": 1
        }]
      }
    }];

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
