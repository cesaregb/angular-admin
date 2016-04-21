'use strict';
(function() {

  class ClientPhoneComponent {

    constructor($uibModal, $stateParams, $state, noty, factoryClients) {
      this.factoryClients = factoryClients;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.client = $stateParams.client;
      if (this.client == null){
        this.$state.go('client', null, { reload: true });
      }else{
        this.getClientInfo();
      }
    }

    getClientInfo() {
      var _this = this;
      _this.factoryClients.getClientById(this.client.idClient).then(function( response ) {
          _this.client = response;
        }), function( err ) {}
    }

    openNewModal() {
      this.openModal({idClient: this.client.idClient});
    }

    openModal ( phone ) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/clients/clientPhone/clientPhoneModal/addPhoneModal.html',
        controller: 'ClientPhoneModalCtrl',
        size: 'md',
        resolve: {
          phone: function() {
            return phone;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        console.log("selectedItem: " + JSON.stringify(selectedItem));

        var phone = selectedItem;
        // if (phone.prefered){
        //
        //   _this.client.phoneNumbers.forEach(function (item, index, theArray) {
        //     if( theArray[index].prefered ){
        //         theArray[index].prefered = false;
        //         _this.updatePhone(theArray[index], function(){ });
        //     }
        //   });
        // }

        if (phone.idPhoneNumber != null && phone.idPhoneNumber > 0) {
          // update phone
          _this.factoryClients.updatePhoneNumberCallback(phone, function(){
            _this.getClientInfo();
          });
        } else {
          // save new phone
          _this.factoryClients.savePhoneNumberCallback(phone, function(){
            _this.getClientInfo();
          });
        }

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
