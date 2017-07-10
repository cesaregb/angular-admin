'use strict';

angular.module('processAdminApp')
  .controller('ClientSearchModalCtrl', function ($scope, factoryServices, clientSearchInfo, serviceClients, $uibModalInstance, $log) {

    $scope.clientInfo = null;
    $scope.clientSearchInfo = clientSearchInfo;

    $scope.filters = [
      {name: 'Nombre', value: 'name'},
      {name: 'E-Mail', value: 'email'},
      {name: 'Numero telefonico', value: 'phone'}
    ];

    $scope.searchClients = function () {
      let text = $scope.searchText;
      let filter = $scope.searchFilter;
      let filterArray = {};
      filterArray[filter.value] = text;

      factoryServices.getClientByFilter(filterArray).then(function (response) {
        $scope.clients = response;
        if ($scope.clients.length === 1) {
          $scope.clientInfo = $scope.clients[0];
          $scope.selectItem();
        }
      });
    };

    $scope.init = function () {
      $scope.searchText = "";
      $scope.clients = [];
      $scope.searchFilter = $scope.filters[0];

      if (Boolean($scope.clientSearchInfo)) {
        $scope.searchText = $scope.clientSearchInfo;
        $scope.searchClients();
      }
    };

    $scope.init();

    $scope.preSelectItem = function (client) {
      $scope.clientInfo = client;
    };

    $scope.selectItemAction = function (client) {
      $scope.clientInfo = client;
      $scope.selectItem();
    };

    $scope.selectItem = function () {
      $uibModalInstance.close($scope.clientInfo);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.checkSearch = function (event) {
      if (event.keyCode === 13) {
        $scope.searchClients();
      }
    }

  });
