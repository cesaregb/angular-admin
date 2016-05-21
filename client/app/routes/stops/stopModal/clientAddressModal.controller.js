'use strict';

angular.module('processAdminApp')
  .controller('ClientAddressModalCtrl', function ($scope, $uibModalInstance, address) {

    $scope.address = address;

    this.init = function(){

      $scope.title = "New address";
      if ($scope.address != null){
        $scope.title = "Edit address";
      }
    };

    this.init();

    /*******  FORM  */
    $scope.addressFields = [
      {
        key: 'country',
        type: 'input',
        defaultValue: 'Mexico',
        templateOptions: {
          type: 'text',
          label: 'Country'
        }
      },{
        key: 'state',
        type: 'input',
        defaultValue: 'Jalisco',
        templateOptions: {
          type: 'text',
          label: 'State'
        }
      },{
        key: 'zipcode',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Zipcode'
        }
      },{
        key: 'city',
        type: 'input',
        defaultValue: 'Guadalajara',
        templateOptions: {
          type: 'text',
          label: 'City',
          required: true
        }
      },{
        key: 'address',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Street and number',
          required: true
        }
      },{
        key: 'address2',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Neigh',
          required: true
        }
      }
    ];

    /*******  END  FORM  */
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.saveAddress = function(){
      $uibModalInstance.close($scope.address);
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  });
