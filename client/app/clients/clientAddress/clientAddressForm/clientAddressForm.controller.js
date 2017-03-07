'use strict';
(function() {

  class ClientAddressFormComponent {

    constructor($scope, $stateParams, $timeout, $state, noty, AddressHandler, $log,
                $confirm, factoryServices, formlyForms, $q, appContext) {
      let t = this;
      // form options, to be updated if the form is new
      t.formOptions = {};
      t.$q = $q;
      t.appContext = appContext;
      t.$confirm = $confirm;
      t.$timeout = $timeout;
      t.factoryServices = factoryServices;
      t.$log = $log;
      t.$scope = $scope;
      t.AddressHandler = AddressHandler;
      t.noty = noty;
      t.addressFields = formlyForms.addressFields;
      t.client = $stateParams.client;
      t.$state = $state;
      t.place = null;
      t.address = $stateParams.address;
      t.factoryServices = factoryServices;

      if (t.client == null) { // redirect
        t.$state.go('client.all', null, { reload: true });
      } else {
        // set parent information..
        t.address.idClient = t.client.idClient;

        t.showMap = false;
        if (t.address != null && t.address.address != null) {
          t.title = "Direccion Existente";
          t.calculateDistancePrice();
        }else{
          t.showMap = true;
          // t.formOptions.formState = { disabled: true };
          t.title = "Nueva Direccion";
          t.fnShowMap();
          t.updateFormStatus();
        }
        t.title += " Client: " + t.client.name;
      }
    }

    fnShowMap(){
      let t = this;
      if (t.showMap){
        t.AddressHandler.initMap(t.address);
      }else{
        $("#map").hide();
      }
    }

    updateFormStatus() {
      angular.forEach(this.addressFields, function(field) {
        field.expressionProperties = field.expressionProperties || {};
        field.expressionProperties['templateOptions.disabled'] = 'formState.disabled';
      });
    }

    createCircles() {
      this.AddressHandler.createCircles();
    }

    parseAddress() {
      // this.formOptions.formState.disabled = false;
      this.AddressHandler.parseAddress();
      this.address = this.AddressHandler.address;
      this.address.idClient = this.client.idClient;
      this.calculateDistancePrice();
    }

    getMarker() {
      this.AddressHandler.parseAddress();
      this.address.lat = this.AddressHandler.address.lat;
      this.address.lng = this.AddressHandler.address.lng;
      this.calculateDistancePrice();
    }

    // called by async get distance info method.
    calculateDistancePrice(){
      let t = this;
      if(Boolean(t.address) && t.address.idAddress > 0){
        t.AddressHandler.initMap(t.address);
        this.AddressHandler.calculateDistancePrice().then(()=>{
          t.distance = this.AddressHandler.distance;
          t.distancePrice = this.AddressHandler.distancePrice;
        });
      }
    }

    delete(){
      let _this = this;
      this.$confirm({ text: 'Are you sure you want to delete?'})
      .then(function() {
        _this.factoryServices.deleteResource('address', _this.address).then(function(){
          _this.back();
        });
      });
    }

    back() {
      this.$state.go('client.address', { client: this.client }, { reload: true });
    }

    saveAddress() {
      let _this = this;
      if (_this.address.idAddress != null && _this.address.idAddress > 0) {
        _this.factoryServices.updateResource('address', _this.address).then(()=>{
          _this.$state.go('client.address', {
            client: _this.client
          }, { reload: true });
        });
      } else {
        // set store information in case of not provided.
        if (!Boolean(_this.address.lat)){
          _this.address.lat = _this.appContext.appContextObject.store.lat;
          _this.address.lng = _this.appContext.appContextObject.store.lng;
        }

        _this.factoryServices.saveResource('address' ,_this.address).then(function() {
          _this.$state.go('client.address', {
            client: _this.client
          }, { reload: true });
        });
      }
    }
  }

  angular.module('processAdminApp')
    .component('clientAddressForm', {
      templateUrl: 'app/clients/clientAddress/clientAddressForm/clientAddressForm.html',
      controller: ClientAddressFormComponent,
      controllerAs: '$cn'
    });

})();
