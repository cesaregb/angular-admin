'use strict';

angular.module('processAdminApp')
  .controller('ProductModalCtrl', function($scope, factoryGeneral, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Product Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryGeneral.getProductTypes().then(function(response){
        response.forEach(function(item){
          $scope.parentSelect.push({name : item.name, value: item.idProductType});
        });
        if (!Boolean($scope.formItem.idProductType) ){
          $scope.formItem.idProductType = 1;
        }else{

        }
      });
    };

    $scope.parentSelect = [];

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
    }, {
      key: 'price',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Price',
        required: true
      }
    },{
      key: 'status',
      type: 'select',
      templateOptions: {
        label: 'Status',
        options: [{
          "name": "Active",
          "value": 1
        }, {
          "name": "Inactive",
          "value": 0
        }]
      }
    },{
      key: 'serviceIncrement',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Increment',
        required: true
      }
    },{
      key: 'idProductType',
      type: 'select',
      templateOptions: {
        label: 'Type',
        options: $scope.parentSelect
      }
    }];

    $scope.okAction = function() {
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
