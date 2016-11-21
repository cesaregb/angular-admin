'use strict';

angular.module('processAdminApp')
  .controller('ClientSearchModalCtrl', function ($scope, factoryServices, clientSearchInfo, serviceClients, $uibModalInstance) {

    $scope.clientInfo = null;
    $scope.clientSearchInfo = clientSearchInfo;

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
      factoryServices.getClientByFilter(filterArray).then(function(response){
          $scope.clients = response;
      });
    };

    $scope.init = function(){
      $scope.searchText = "";
      $scope.clients = [];
      $scope.searchFilter = $scope.filters[0];

      if (Boolean($scope.clientSearchInfo)){
          $scope.searchText = $scope.clientSearchInfo;
          $scope.searchClients();
      }

    }
    $scope.init();

    $scope.preSelectItem = function(client){
      $scope.clientInfo = client;
    }

    $scope.selectItemAction = function(client){
      $scope.clientInfo = client;
      $scope.selectItem();
    }

    $scope.selectItem = function(){
      $uibModalInstance.close($scope.clientInfo);
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
