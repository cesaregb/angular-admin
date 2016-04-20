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
        if (item.prefered){
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
        if (item.prefered ){
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
        if (item.prefered ){
          _this.selectedPayment = item;
        }
      });
    }
  }


  back() { // back handler...
    this.$state.go('client',null , { reload: true });
  }

  changeDefaultPhone(){
    // change the selected phone.
    var _this = this;

    _this.client.phoneNumbers.forEach(function (item, index, theArray) {
      if (item.idPhoneNumber ==  _this.selectedPhone.idPhoneNumber){
        theArray[index].prefered = true;
        _this.updatePhone(theArray[index], _this.getClient);
      }else{
        if (theArray[index].prefered){
          theArray[index].prefered = false;
          _this.updatePhone(theArray[index], _this.getClient);
        }
      }
    });
  }

  updatePhone(phone, callback){
    this.factoryClients.updatePhoneNumber(phone).then(function(result){
      console.log("updatePhone sucessful " + JSON.stringify(result));
      callback();
    }), function(error){
      console.log("error updatePhone: " + JSON.stringify(error));
      callback();
    }
  }

  getClient(id){
    var _this = this;
    _this.factoryClients.getClientByID(id).then(function(data){
      _this.client = data;
    });
  }

  updateAddress(){
    console.log("address: " + JSON.stringify(this.selectedAddress));
    // change the selected phone.
    _this.client.addresses.forEach(function (item, index, theArray) {
      if (item.idAddress ==  _this.selectedAddress.idAddress){
        theArray[index].prefered = true;
      }else{
        theArray[index].prefered = false;
      }
    });

    _this.saveExistingClient();
  }

  updatePayment(){
    console.log("payment: " + JSON.stringify(this.selectedPayment));
    // change the selected phone.
    _this.client.clientPaymentInfos.forEach(function (item, index, theArray) {
      if (item.idClientPaymentInfo ==  _this.selectedPayment.idClientPaymentInfo){
        theArray[index].prefered = true;
      }else{
        theArray[index].prefered = false;
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
        phoneNumberTmp.prefered = true;
        myClient.phoneNumbers.push(phoneNumberTmp);

        // not abstracting this piece cuz its only used here.
        _this.factoryClients.saveClient( myClient ).then( function(data){ // saving new
          console.log("Client saved... " + JSON.stringify(data));
          _this.$state.go('client', { reload: true });
        }),function(error){ // error saving new
          console.log("Error saving client " + JSON.stringify(error));
        };

      }else{
        _this.saveExistingClient();
      }
    }
  }

  saveExistingClient(){
    var _this = this;
    _this.factoryClients.updateClient( _this.client ).then(function(data){ // updating existing
      console.log("Client updated. " + JSON.stringify(data));
      // _this.$state.go('client', { reload: true });

    }),function(error){ // error saving existing
      console.log("Error updating client: " + JSON.stringify(error));
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
