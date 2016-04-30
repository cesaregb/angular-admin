'use strict';
(function() {

  class ClientAddressComponent {

    constructor($uibModal, $stateParams, $state, noty, factoryClients) {
      this.factoryClients = factoryClients;
      this.$uibModal = $uibModal;
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

      this.$state.go('client.addressForm', {client: this.client, address: address}, { reload: true });

      // var _this = this;
      // var modalInstance = this.$uibModal.open({
      //   animation: false,
      //   templateUrl: '/app/clients/clientAddress/clientAddressModal/addAddressModal.html',
      //   controller: 'ClientAddressModalCtrl',
      //   size: 'md',
      //   resolve: {
      //     address: function() {
      //       return address;
      //     }
      //   }
      // });
      //
      // modalInstance.result.then(function(selectedItem) {
      //   console.log("selectedItem: " + JSON.stringify(selectedItem));
      //   var address = selectedItem;
      //
      //   if (address.idAddressNumber != null && address.idAddressNumber > 0) {
      //     // update address
      //     _this.factoryClients.updateAddressCallback(address, function() {
      //       _this.getClientInfo();
      //     });
      //   } else {
      //     // save new address
      //     _this.factoryClients.saveAddressCallback(address, function() {
      //       _this.getClientInfo();
      //     });
      //   }
      // });
    }
  }

  angular.module('processAdminApp')
    .component('clientAddress', {
      templateUrl: 'app/clients/clientAddress/clientAddress.html',
       controller: ClientAddressComponent,
      controllerAs: '$cn'
    });

})();
