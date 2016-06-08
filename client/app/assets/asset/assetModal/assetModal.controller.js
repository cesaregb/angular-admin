'use strict';

angular.module('processAdminApp')
  .controller('AssetModalCtrl', function($scope, factoryGeneral, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Asset Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryGeneral.getAssetTypes().then(function(response){
        response.forEach(function(item){
          $scope.parentSelect.push({name : item.name, value: item.idAssetType});
        });
        if (!Boolean($scope.formItem.idAssetType) ){
          $scope.formItem.idAssetType = 1;
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
      key: 'idAssetType',
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
