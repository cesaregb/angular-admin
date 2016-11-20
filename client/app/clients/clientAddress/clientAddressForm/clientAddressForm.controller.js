'use strict';
(function() {

  class ClientAddressFormComponent {

    constructor($scope, $stateParams, $timeout, $state, noty, AddressHandler, $log, $confirm, factoryServices, googleMapsDirections, formlyForms) {
      var t = this;
      // form options, to be updated if the form is new
      t.formOptions = {};

      t.$confirm = $confirm;
      t.$timeout = $timeout;
      t.factoryServices = factoryServices;
      t.$log = $log;
      t.$scope = $scope;
      t.AddressHandler = AddressHandler;
      t.noty = noty;
      t.addressFields = formlyForms.addressFields;

      // get information from "context"
      t.client = $stateParams.client;
      t.$state = $state;
      t.place = null;

      t.address = $stateParams.address;
      t.factoryServices = factoryServices;
      if (t.client == null) { // redirect
        t.$state.go('client.all', null, { reload: true });
      } else {
        t.showMap = false;
        if (t.address != null && t.address.address != null) {
          t.title = "Direccion Existente";
          t.calculateDistancePrice();
        }else{
          t.formOptions.formState = { disabled: true };
          t.title = "Nueva Direccion";
          t.fnShowMap();
          t.updateFormStatus();
        }
        t.title = t.title + " Client: " + t.client.name;
      }

      t.getAsyncDep();
    }

    getAsyncDep(){
      this.factoryServices.getResources('distanceInfo').then(function(response){
        this.distanceInfo = response;
      }.bind(this));
    }

    fnShowMap(){
      var t = this;
      t.showMap = !t.showMap;

      t.$timeout(function() {
        t.AddressHandler.initMap();
        t.AddressHandler.setAddress(t.address);
        if (t.address != null && t.address.idAddress != null) {
          t.calculateDistancePrice();
          t.AddressHandler.addExistingMarker();
        }
      }, 100);
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
      this.formOptions.formState.disabled = false;
      this.AddressHandler.parseAddress();
      this.address = this.AddressHandler.address;
      this.calculateDistancePrice();
    }

    calculateDistancePrice(){
      var _this = this;
      this.AddressHandler.calculateDistancePrice();
      this.distance = this.AddressHandler.distance;
      if (Boolean(this.distanceInfo)){
        this.distanceInfo.forEach(function(item){
          if (_this.distance < item.distance ){
            _this.distancePrice = item.price;
          }
        });
      }
    }

    delete(){
      var _this = this;
      this.$confirm({ text: 'Are you sure you want to delete?'})
      .then(function() {
        _this.factoryServices.deleteResource('address', _this.address).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.$state.go('client.address', { client: this.client }, { reload: true });
    }

    saveAddress() {
      var _this = this;
      if (_this.address.idAddress != null && _this.address.idAddress > 0) {
        _this.factoryServices.updateResource('address', _this.address).then(function() {
          _this.$state.go('client.address', {
            client: _this.client
          }, { reload: true });
        });
      } else {
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
