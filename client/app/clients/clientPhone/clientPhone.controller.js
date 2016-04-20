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
      _this.factoryClients.getClientByID(this.client.idClient).then(function( response ) {
          _this.client = response;
          console.log("updating client: " + JSON.stringify(_this.client));
        }),
        function( err ) {
          _this.noty.showNoty({
            text: "Error getting client phones. ",
            ttl: 1000 * 2,
            type: "warning"
          });
        }
    }

    openNewModal() {
      this.openModal({idClient: this.client.idClient});
    }


    createPhone(phone, callback){
      console.log("Creating phone.. ");
      this.factoryClients.savePhoneNumber(phone).then(function(result){
        console.log("phone saved sucessful " + JSON.stringify(result));
        callback();
      }), function(error){
        console.log("error saving phone: " + JSON.stringify(error));
        callback();
      }


    }

    updatePhone(phone, callback){
      this.factoryClients.updatePhoneNumber(phone).then(function(result){
        console.log("phone updatePhone sucessful " + JSON.stringify(result));
        callback();
      }), function(error){
        console.log("error updatePhone phone: " + JSON.stringify(error));
        callback();
      }
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
          _this.updatePhone(phone, function(){
            _this.getClientInfo();
          });
        } else {
          // save new phone
          _this.createPhone(phone, function(){
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
