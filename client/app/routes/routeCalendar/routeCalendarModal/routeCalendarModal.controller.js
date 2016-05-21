'use strict';

angular.module('processAdminApp')
  .controller('ClientPaymentInfoModalCtrl', function($scope, $uibModalInstance, clientPaymentInfo) {

    $scope.clientPaymentInfo = clientPaymentInfo;

    this.init = function() {

      $scope.title = "New clientPaymentInfo";
      if ($scope.clientPaymentInfo != null) {
        $scope.title = "Edit clientPaymentInfo";
      }
    };

    this.init();

    /*******  FORM  */
    $scope.clientPaymentInfoFields = [{
      key: 'token',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Token',
        required: true
      }
    }, {
      key: 'type',
      type: 'select',
      templateOptions: {
        label: 'Type',
        options: [{
          "name": "Cash",
          "value": 0
        }, {
          "name": "Credit Card",
          "value": 1
        }, {
          "name": "Paypal",
          "value": 2
        }, {
          "name": "stripe",
          "value": 3
        }, {
          "name": "other",
          "value": 4
        }]
      }
    }];

    /*******  END  FORM  */
    $scope.ok = function() {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.savePhone = function() {
      $uibModalInstance.close($scope.clientPaymentInfo);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
