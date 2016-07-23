'use strict';
(function(){

class ClientEditComponent {
  selectedPhone = null;

  constructor($stateParams, $state, noty, serviceClients, factoryClients, $confirm, $log) {
    this.$log = $log;
    var _this = this;
    this.$confirm = $confirm;
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
    if (this.client != null) {
      this.newClient = false;
      this.title = "Edit: " + this.client.name;
    }


    this.selectedPhone = null;
    this.selectedAddress = null;
    this.selectedPayment = null;

    // set up initial phone
    if (Boolean(this.client)){
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

      // facturacion
      if (Boolean(this.client.rfc) ){
        this.facturacion = true;
        this.client.addresses.forEach(function(item){
          if (item.factura){
            _this.facturacionAddress = item;
          }
        });
      }
    }

  }

  delete(){
    var _this = this;
    this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryClients.deleteClient(_this.client).then(function(info){
          _this.back();
        });
      });
  }

  back() {
    this.$state.go('client.all',null , { reload: true });
  }

  changeDefaultPhone(){
    var _this = this;

    _this.client.phoneNumbers.forEach(function (item, index, theArray) {
      if (item.idPhoneNumber ==  _this.selectedPhone.idPhoneNumber){
        theArray[index].prefered = true;
        _this.factoryClients.updatePhoneNumberCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
      }else{
        if (theArray[index].prefered){
          theArray[index].prefered = false;
          _this.factoryClients.updatePhoneNumberCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
        }
      }
    });
  }

  changeDefaultAddress(){
    var _this = this;

    _this.client.addresses.forEach(function (item, index, theArray) {
      if (item.idAddress ==  _this.selectedAddress.idAddress){
        theArray[index].prefered = true;
        _this.factoryClients.updateAddressCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
      }else{
        if (theArray[index].prefered){
          theArray[index].prefered = false;
          _this.factoryClients.updateAddressCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
        }
      }
    });
  }

  changeDefaultPayment(){
    var _this = this;
    _this.client.clientPaymentInfos.forEach(function (item, index, theArray) {
      if (item.idClientPaymentInfo ==  _this.selectedPayment.idClientPaymentInfo){
        theArray[index].prefered = true;
        _this.factoryClients.updateClientPaymentInfoCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
      }else{
        if (theArray[index].prefered){
          theArray[index].prefered = false;
          _this.factoryClients.updateClientPaymentInfoCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
        }
      }
    });
  }

  getClient(id){
    // var _this = this;
    // this.factoryClients.getClientById(id).then(function(data){
    //   _this.client = data;
    // });
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
          _this.client = data;
          _this.settupClient();
          // _this.$state.go('client', { reload: true });
        }),function(error){ // error saving new
          console.log("Error saving client " + JSON.stringify(error));
        };

      }else{
        _this.saveExistingClient();
      }
    }
  }

  changeDireccionFacturacion(){
    var _this = this;
    _this.client.addresses.forEach(function (item, index, theArray) {
      if (item.idAddress ==  _this.facturacionAddress.idAddress){
        theArray[index].factura = true;
        _this.factoryClients.updateAddressCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
      }else{
        if (theArray[index].factura){
          theArray[index].factura = false;
          _this.factoryClients.updateAddressCallback(theArray[index], function(){_this.getClient(_this.client.idClient);});
        }
      }
    });
  }

  saveExistingClient(){
    var _this = this;
    _this.factoryClients.updateClient( _this.client ).then(function(data){ // updating existing
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
