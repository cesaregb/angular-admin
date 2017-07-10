'use strict';
(function() {

  class ClientPaymentInfoComponent {

    MAIN_TABLE='clientPaymentInfo';

    constructor($uibModal, $stateParams, $state, noty, factoryServices, $confirm) {
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
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
      _this.factoryServices.getResourceById('clients', this.client.idClient).then(function(response) {
          _this.client = response;
      });
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
        templateUrl: 'app/clients/clientPaymentInfo/clientPaymentInfoModal/clientPaymentInfo.html',
        controller: 'ClientPaymentInfoModalCtrl',
        size: 'md',
        resolve: {
          clientPaymentInfo: function() {
            return clientPaymentInfo;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {

        var clientPaymentInfo = selectedItem;
        if (clientPaymentInfo.idClientPaymentInfo != null && clientPaymentInfo.idClientPaymentInfo > 0) {
          // update clientPaymentInfo
          _this.factoryServices.updateResourceCallback(_this.MAIN_TABLE, clientPaymentInfo, function() {
            _this.getClientInfo();
          });
        } else {
          // save new clientPaymentInfo
          _this.factoryServices.updateResourceCallback(_this.MAIN_TABLE, clientPaymentInfo, function() {
            _this.getClientInfo();
          });
        }
      });
    }

    delete(clientPayment){
      var _this = this;
      this.$confirm({
        text: 'Estas seguro de borrar el registro??'
      })
      .then(function() {
        _this.factoryServices.deleteResource(_this.MAIN_TABLE, clientPayment).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.$state.go('client.payment', {
        client: this.client
      }, {
        reload: true
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
