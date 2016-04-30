'use strict';
(function() {

  class ClientPaymentInfoComponent {

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

    openNewModal() {
      this.openModal({
        idClient: this.client.idClient
      });
    }

    openModal(clientPaymentInfo) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/clients/clientPaymentInfo/clientPaymentInfoModal/clientPaymentInfo.html',
        controller: 'ClientPaymentInfoModalCtrl',
        size: 'md',
        resolve: {
          clientPaymentInfo: function() {
            return clientPaymentInfo;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        console.log("selectedItem: " + JSON.stringify(selectedItem));

        var clientPaymentInfo = selectedItem;
        if (clientPaymentInfo.idClientPaymentInfo != null && clientPaymentInfo.idClientPaymentInfo > 0) {
          // update clientPaymentInfo
          _this.factoryClients.updateClientPaymentInfoCallback(clientPaymentInfo, function() {
            _this.getClientInfo();
          });
        } else {
          // save new clientPaymentInfo
          _this.factoryClients.saveClientPaymentInfoCallback(clientPaymentInfo, function() {
            _this.getClientInfo();
          });
        }
      });
    }
  } // closing class

  angular.module('processAdminApp')
    .component('clientPaymentInfo', {
      templateUrl: 'app/clients/clientPaymentInfo/clientPaymentInfo.html',
      controller: ClientPaymentInfoComponent,
      controllerAs: '$cn'
    });

})();
