'use strict';

angular.module('processAdminApp')
  .controller('ProductModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Product Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryServices.getResources('productType').then(function(response){
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
        label: 'Nombre',
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
    }, {
      key: 'maxQty',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Cantidad Maxima',
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
