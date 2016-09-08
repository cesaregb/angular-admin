'use strict';

angular.module('processAdminApp')
  .controller('SubproductModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Subproduct Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryServices.getResources('subproductType').then(function(response){
        response.forEach(function(item){
          $scope.parentSelect.push({name : item.name, value: item.idSubproductType});
        });
        if (!Boolean($scope.formItem.idSubproductType) ){
          $scope.formItem.idSubproductType = 1;
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
      key: 'idSubproductType',
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
