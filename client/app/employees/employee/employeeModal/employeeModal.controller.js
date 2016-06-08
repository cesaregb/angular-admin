'use strict';

angular.module('processAdminApp')
  .controller('EmployeeModalCtrl', function($scope, factoryGeneral, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;

    this.init = function() {

      $scope.title = "Form Employee Type";
      if (Boolean($scope.formItem)) {
        // placeholder
      }

      factoryGeneral.getEmployeeTypes().then(function(response){
        response.forEach(function(item){
          $scope.parentSelect.push({name : item.name, value: item.idEmployeeType});
        });
        if (!Boolean($scope.formItem.idEmployeeType) ){
          $scope.formItem.idEmployeeType = 1;
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
      key: 'lastname',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Lastname',
        required: true
      }
    }, {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Email',
        required: true
      }
    },{
      key: 'idEmployeeType',
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
