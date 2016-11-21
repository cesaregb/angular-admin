'use strict';

angular.module('processAdminApp')
  .controller('ClientPhoneModalCtrl', function ($scope, $uibModalInstance, phone) {

    $scope.phone = phone;

    this.init = function(){

      $scope.title = "New phone";
      if ($scope.phone != null){
        $scope.title = "Edit phone";
      }
    };

    this.init();

    /*******  FORM  */
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
      }
      // , {
      //   key: 'prefered',
      //   type: 'checkbox',
      //   templateOptions: {
      //     label: 'Prefered'
      //   }
      // }
    ];

    /*******  END  FORM  */
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.savePhone = function(){
      $uibModalInstance.close($scope.phone);
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  });
