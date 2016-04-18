'use strict';
(function(){

class ClientEditComponent {
  selectedPhone = null;

  constructor($stateParams, $state, noty, serviceClients, factoryClients) {
    var _this = this;
    this.serviceClients = serviceClients;
    this.factoryClients = factoryClients;
    this.noty = noty;
    this.newClient = true;
    this.$state = $state;
    this.client = $stateParams.client;

    this.title = "New Client"
    this.validClient = null;
    this.settupClient();
  }

  // load initial client if any...
  settupClient(){
    var _this = this;
    if (this.client != null){
      this.newClient = false;
      this.title = "Edit: " + this.client.name;
    }

    this.selectedPhone = null;
    this.selectedAddress = null;
    this.selectedPayment = null;

    // set up initial phone
    if (this.selectedPhone == null
        && this.client != null
        && this.client.phoneNumbers != null
        && this.client.phoneNumbers.length > 0){

      this.selectedPhone = this.client.phoneNumbers[0];
      this.client.phoneNumbers.forEach(function(item){
        if (item.prefered == 1){
          _this.selectedPhone = item;
        }
      });
    }

    // set up initial address
    if (this.selectedAddress == null
        && this.client != null
        && this.client.addresses != null
        && this.client.addresses.length > 0){

      this.selectedAddress = this.client.addresses[0];
      this.client.addresses.forEach(function(item){
        if (item.prefered == 1){
          _this.selectedAddress = item;
        }
      });
    }

    // set up initial payment
    if (this.selectedPayment == null
        && this.client != null
        && this.client.clientPaymentInfos != null
        && this.client.clientPaymentInfos.length > 0){

      this.selectedPayment = this.client.clientPaymentInfos[0];
      this.client.clientPaymentInfos.forEach(function(item){
        if (item.prefered == 1){
          _this.selectedPayment = item;
        }
      });
    }
  }


  back() { // back handler...
    this.$state.go('client',null , { reload: true });
  }

  updatePhone(){
    console.log("phone: " + JSON.stringify(this.selectedPhone));
    // change the selected phone.
    _this.client.phoneNumbers.forEach(function (item, index, theArray) {
      if (item.idPhoneNumber ==  _this.selectedPhone.idPhoneNumber){
        theArray[index].prefered = 1;
      }else{
        theArray[index].prefered = 0;
      }
    });

    _this.saveExistingClient();

  }

  updateAddress(){
    console.log("address: " + JSON.stringify(this.selectedAddress));
    // change the selected phone.
    _this.client.addresses.forEach(function (item, index, theArray) {
      if (item.idAddress ==  _this.selectedAddress.idAddress){
        theArray[index].prefered = 1;
      }else{
        theArray[index].prefered = 0;
      }
    });

    _this.saveExistingClient();
  }

  updatePayment(){
    console.log("payment: " + JSON.stringify(this.selectedPayment));
    // change the selected phone.
    _this.client.clientPaymentInfos.forEach(function (item, index, theArray) {
      if (item.idClientPaymentInfo ==  _this.selectedPayment.idClientPaymentInfo){
        theArray[index].prefered = 1;
      }else{
        theArray[index].prefered = 0;
      }
    });

    _this.saveExistingClient();
  }

  saveClient(){
    var _this = this;

    if (this.clientForm.$valid) {

      if (this.newClient){

        // add phone on new client
        var myClient = this.client;
        myClient.phoneNumbers = [];

        var phoneNumberTmp = {};
        phoneNumberTmp.number = this.temporalPhone;
        phoneNumberTmp.prefered = 1;
        myClient.phoneNumbers.push(phoneNumberTmp);

        // not abstracting this piece cuz its only used here.
        _this.factoryClients.saveClient( myClient ).then( function(data){ // saving new
          _this.noty.showNoty({
            text: "Client saved succesful ",
            ttl: 1000 * 2,
            type: "success" // warning
          });

          _this.$state.go('client', { reload: true });

        }),function(data){ // error saving new
          console.log("Error saving client " + JSON.stringify(data));
          _this.noty.showNoty({
            text: "Error saving client... ",
            ttl: 1000 * 2,
            type: "warning"
          });
        };

      }else{
        _this.saveExistingClient();
      }
    }
  }

  saveExistingClient(){
    var _this = this;
    _this.factoryClients.updateClient( _this.client ).then(function(data){ // updating existing
      _this.noty.showNoty({
        text: "Client saved succesful ",
        ttl: 1000 * 2,
        type: "success"
      });
      _this.$state.go('client', { reload: true });

    }),function(data){ // error saving existing
      _this.noty.showNoty({
        text: "Error saving client... ",
        ttl: 1000 * 2,
        type: "warning"
      });
    };
  }

}

angular.module('processAdminApp')
  .component('clientEdit', {
    templateUrl: 'app/clients/clientEdit/clientEdit.html',
    controller: ClientEditComponent,
    controllerAs: '$cn'
  });

})();
