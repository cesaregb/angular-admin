'use strict';
(function() {

  class ClientAddressComponent {

    constructor($uibModal, $stateParams, $state, noty, factoryClients, $scope, $log) {
      this.$log = $log;
      this.factoryClients = factoryClients;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.client = $stateParams.client;
      if (this.client == null) {
        this.$state.go('client.all', null, {
          reload: true
        });
      } else {
        this.getClientInfo();
      }
    }

    getClientInfo() {
      var _this = this;
      _this.factoryClients.getClientById(this.client.idClient).then(function(response) {
          _this.client = response;
        }),
        function(err) {}
    }

    addNewItem() {
      this.addEditItem({
        idClient: this.client.idClient
      });
    }

    addEditItem(address) {
      this.$scope.$parent.openAddressForm(this.client, address);
    }
  }

  angular.module('processAdminApp')
    .component('clientAddress', {
      templateUrl: 'app/clients/clientAddress/clientAddress.html',
       controller: ClientAddressComponent,
      controllerAs: '$cn'
    });

})();
