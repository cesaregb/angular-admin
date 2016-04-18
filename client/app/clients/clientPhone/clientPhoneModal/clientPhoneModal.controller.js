'use strict';

angular.module('processAdminApp')
  .controller('ClientPhoneModalCtrl', function ($scope, $uibModalInstance, items, phone) {

    $scope.phone = phone;
    $scope.items = items;

    this.init = function(){

      $scope.title = "New phone";
      if ($scope.phone != null){
        $scope.title = "Edit phone";
      }

      $scope.selected = {
        item: $scope.items[0]
      };
    };

    this.init();

    /*******  FORM  */

    $scope.phone = {};

    $scope.phoneFields = [
      {
        key: 'number',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Phone Number',
          placeholder: '# # # # # # # # # #',
          required: true
        }
      }, {
        key: 'prefered',
        type: 'checkbox',
        templateOptions: {
          label: 'Prefered'
        }
      }
    ];

    /*******  END  FORM  */


    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  });
