'use strict';

angular.module('processAdminApp')
  .controller('ServiceTypeModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Service Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryServices.getResources('serviceCategory').then(function(response){
        response.forEach(function(item){
          $scope.parentSelect.push({name : item.name, value: item.idServiceCategory});
        });
        if (!Boolean($scope.formItem.idServiceCategory) ){
          $scope.formItem.idServiceCategory = 1;
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
    }, {
      key: 'time',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Time',
        required: true
      }
    },{
      key: 'idServiceCategory',
      type: 'select',
      templateOptions: {
        label: 'Service Category',
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
