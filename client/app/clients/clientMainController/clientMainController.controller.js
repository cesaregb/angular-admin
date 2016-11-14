'use strict';

angular.module('processAdminApp')
  .controller('ClientMainControllerCtrl', function($scope, $state, $log, factoryServices) {

    $scope.appModule = "clients"

    $scope.openAddressForm = function(client, address){
      $state.go('client.addressForm', {client: client, address: address}, { reload: true });
    }

  });
