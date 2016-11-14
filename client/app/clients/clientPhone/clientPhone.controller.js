'use strict';
(function() {

  class ClientPhoneComponent {

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
      _this.factoryServices.getResourceById('client', this.client.idClient).then(function(response) {
          _this.client = response;
        }),
        function(err) {}
    }

    openNewModal() {
      this.openModal({
        idClient: this.client.idClient
      });
    }

    openModal(phone) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/clients/clientPhone/clientPhoneModal/addPhoneModal.html',
        controller: 'ClientPhoneModalCtrl',
        size: 'md',
        resolve: {
          phone: function() {
            return phone;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        var phone = selectedItem;
        if (phone.idPhoneNumber != null && phone.idPhoneNumber > 0) {
          // update phone
          _this.factoryServices.updateResourceCallback('phone', phone, function() {
            _this.getClientInfo();
          });
        } else {
          // save new phone
          _this.factoryServices.updateResourceCallback('phone', phone, function() {
            _this.getClientInfo();
          });
        }

      });
    }

    delete(phoneNumber){
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryServices.deleteResource('phone', phoneNumber).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.$state.go('client.phone', {
        client: this.client
      }, {
        reload: true
      });
    }

  } // closing class

  angular.module('processAdminApp')
    .component('clientPhone', {
      templateUrl: 'app/clients/clientPhone/clientPhone.html',
      controller: ClientPhoneComponent,
      controllerAs: '$cn'
    });

})();
