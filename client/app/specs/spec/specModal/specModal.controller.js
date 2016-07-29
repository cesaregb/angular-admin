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
        formItem.isPrimary = 0; // hardcoded.. was not used... yet
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
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Description',
        required: true
      }
    }, {
      key: 'max_qty',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Cuantes se pueden agregar? (0 = infinito)',
        required: true
      }
    },{
      key: 'optional',
      type: 'select',
      templateOptions: {
        label: 'Opcional',
        options: [{
          "name": "No",
          "value": 0
        }, {
          "name": "Yes",
          "value": 1
        }]
      }
    },{
      "type": "checkbox",
      "key": "primarySpec",
      "templateOptions": {
        "label": "Precio Base"
      }
    }];

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
