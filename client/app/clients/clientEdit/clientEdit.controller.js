'use strict';
(function(){

class ClientEditComponent {
  constructor($stateParams, $state, noty, serviceClients, factoryServices, $confirm, $log) {
    this.$log = $log;
    this.$confirm = $confirm;
    this.serviceClients = serviceClients;
    this.factoryServices = factoryServices;
    this.noty = noty;
    this.newClient = true;
    this.$state = $state;
    this.client = $stateParams.client;

    this.title = "New Client"
    this.setupClient();
    this.clientTypes = [];
  }

  // load initial client if any...
  setupClient(){
    var t = this;
    if (t.client != null) {
      t.newClient = false;
      t.title = "Edit: " + t.client.name;
    }else {
      t.client = {};
    }


    t.factoryServices.getResources('clientType').then(function(result){
      t.clientTypes = result;
      if (Boolean(t.client)){
        t.clientTypes.forEach(function(ct){
          if (ct.idClientType == t.client.idClientType){
            t.clientType = ct;
          }
        });
      }
    });


    t.selectedAddress = null;
    t.selectedPayment = null;

    // set up initial phone
    if (Boolean(t.client)){
      // set up initial address
      if (this.selectedAddress == null
          && this.client != null
          && this.client.addresses != null
          && this.client.addresses.length > 0){

        this.selectedAddress = this.client.addresses[0];
        this.client.addresses.forEach(function(item){
          if (item.prefered ){
            t.selectedAddress = item;
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
            t.selectedPayment = item;
          }
        });
      }

      // facturacion
      if (Boolean(this.client.rfc)){
        this.facturacion = true;
        if (Boolean(this.client.addresses)){
          this.client.addresses.forEach(function(item){
            if (item.factura){
              t.facturacionAddress = item;
            }
          });
        }
      }
    }
  }

  selectClientType(){
    this.client.idClientType = this.clientType.idClientType;
    this.$log.info('[selecttype] type: ' + this.client.idClientType);
  }

  delete(){
    var _this = this;
    this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryServices.deleteResource('clients', _this.client.idClient)
          .then(function(){ _this.back(); });
      });
  }

  back() {
    this.$state.go('client.all',null , { reload: true });
  }

  changeDefaultAddress(){
    var _this = this;
    _this.client.addresses.forEach(function (item, index, theArray) {
      if (item.idAddress ==  _this.selectedAddress.idAddress){
        theArray[index].prefered = true;
        _this.factoryServices.updateResourceCallback('address', theArray[index], function(){_this.getClient(_this.client.idClient);});
      }else{
        if (theArray[index].prefered){
          theArray[index].prefered = false;
          _this.factoryServices.updateResourceCallback('address',theArray[index], function(){_this.getClient(_this.client.idClient);});
        }
      }
    });
  }

  changeDefaultPayment(){
    var _this = this;
    _this.client.clientPaymentInfos.forEach(function (item, index, theArray) {
      if (item.idClientPaymentInfo ==  _this.selectedPayment.idClientPaymentInfo){
        theArray[index].prefered = true;
        _this.factoryServices.updateResourceCallback('clientPaymentInfo', theArray[index], function(){_this.getClient(_this.client.idClient);});
      }else{
        if (theArray[index].prefered){
          theArray[index].prefered = false;
          _this.factoryServices.updateResourceCallback('clientPaymentInfo', theArray[index], function(){_this.getClient(_this.client.idClient);});
        }
      }
    });
  }

  getClient(id){ }

  saveClient(){
    var _this = this;

    if (this.clientForm.$valid) {
      if (this.newClient){
        _this.factoryServices.saveResource('clients', this.client).then( (data) => {
          _this.client = data;
          _this.setupClient();
        });

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
        _this.factoryServices.updateResource('address', theArray[index]).then(function(){
          _this.getClient(_this.client.idClient);
        });
      }else{
        if (theArray[index].factura){
          theArray[index].factura = false;
          _this.factoryServices.updateResource('address', theArray[index]).then(function(){
            _this.getClient(_this.client.idClient);
          });
        }
      }
    });
  }

  saveExistingClient(){
    var _this = this;
    _this.factoryServices.updateResource('clients', _this.client ).then(function(data){
    });
  }

  createOrder(){
    var order = {};
    order.client = this.client;
    this.$state.go('orders.formOrder', {order: order}, { reload: true });
  }
}

angular.module('processAdminApp')
  .component('clientEdit', {
    templateUrl: 'app/clients/clientEdit/clientEdit.html',
    controller: ClientEditComponent,
    controllerAs: '$cn'
  });

})();
