'use strict';

angular.module('processAdminApp')
  .controller('SupplyModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Supply Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryServices.getResources('supplyType').then(function(response){
        response.forEach(function(item){
          $scope.parentSelect.push({name : item.name, value: item.idSupplyType});
        });
        if (!Boolean($scope.formItem.idSupplyType) ){
          $scope.formItem.idSupplyType = 1;
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
        label: 'Nombre',
        required: true
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Descripcion',
        required: true
      }
    }, {
      key: 'price',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Precio',
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
        type: 'number',
        label: 'Incremento en %',
        required: true
      }
    },{
      key: 'idSupplyType',
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
