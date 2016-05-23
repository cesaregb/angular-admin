'use strict';

angular.module('processAdminApp')
  .controller('ClientSearchModalCtrl', function ($scope, factoryClients, clientInfo, serviceClients, $uibModalInstance) {

    $scope.clientInfo = null;

    $scope.filters = [
        {name:'Name', value:'name'},
        {name:'Email', value:'email'},
        {name:'Phone Number', value:'phone'}
    ];

    $scope.searchClients = function(){
      var filterArray = [];
      var text = $scope.searchText;
      var filter = $scope.searchFilter;
      filterArray.push({'key':filter.value, 'value':text})
      factoryClients.getClientByFilter(filterArray).then(function(response){
          $scope.clients = response;
      });
    };

    $scope.init = function(){
      $scope.searchText = "";
      $scope.clients = [];
      $scope.clients = serviceClients.query();
      $scope.searchFilter = $scope.filters[0];
    }
    $scope.init();

    $scope.preSelectItem = function(client){
      $scope.clientInfo = client;
    }

    $scope.selectItem = function(){
      $uibModalInstance.close($scope.clientInfo);
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
