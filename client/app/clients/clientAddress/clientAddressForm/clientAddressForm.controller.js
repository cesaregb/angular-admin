'use strict';
(function() {

  class ClientAddressFormComponent {

    formOptions = {
      formState: {
        disabled: true
      }
    };

    addressFields = [{
      key: 'country',
      type: 'input',
      defaultValue: 'Mexico',
      templateOptions: {
        type: 'text',
        label: 'Country'
      }
    }, {
      key: 'state',
      type: 'input',
      defaultValue: 'Jalisco',
      templateOptions: {
        type: 'text',
        label: 'State'
      }
    }, {
      key: 'zipcode',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Zipcode'
      }
    }, {
      key: 'city',
      type: 'input',
      defaultValue: 'Guadalajara',
      templateOptions: {
        type: 'text',
        label: 'City',
        required: true
      }
    }, {
      key: 'address',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Street and number',
        required: true
      }
    }, {
      key: 'address2',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Neigh',
        required: true
      }
    }, {
      key: 'comments',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Comments',
        required: true
      }
    }];

    constructor($scope, $stateParams, factoryClients, $timeout, $state, noty, AddressHandler, $log) {
      this.$log = $log;
      this.$scope = $scope;
      this.AddressHandler = AddressHandler;
      var _this = this;
      this.noty = noty;


      this.client = $stateParams.client;
      this.$state = $state;
      this.place = null;

      this.address = $stateParams.address;
      this.factoryClients = factoryClients;
      if (this.client == null) {
        this.$state.go('client.all', null, {
          reload: true
        });
      } else {
        this.title = "New address";
        this.newAddress = true;
        if (this.address != null && this.address.address != null) {
          this.newAddress = false;
          this.title = "Edit address";
        }
        this.title = this.title + " Client: " + this.client.name

        $timeout(function() {
          _this.AddressHandler.initMap();
          _this.AddressHandler.setAddress(_this.address);

          if (_this.address != null && _this.address.idAddress != null) {
              _this.AddressHandler.addExistingMarker();
          }

        }, 100);
      }
      this.updateFormStatus();
    }

    updateFormStatus(){
      angular.forEach(this.addressFields, function(field) {
        field.expressionProperties = field.expressionProperties || {};
        field.expressionProperties['templateOptions.disabled'] = 'formState.disabled';
      });
    }


    createCircles() {
      this.AddressHandler.createCircles();
    }

    parseAddress() {
      this.formOptions.formState.disabled=false;
      this.AddressHandler.parseAddress();
      this.address = this.AddressHandler.address;
    }

  saveAddress() {
      var _this = this;
      if (_this.address.idAddress != null && _this.address.idAddress > 0) {
        // update address
        _this.factoryClients.updateAddressCallback(_this.address, function() {
          _this.$state.go('client.address', {
            client: _this.client
          }, {
            reload: true
          });
        });
      } else {
        // save new address
        _this.factoryClients.saveAddressCallback(_this.address, function() {
          _this.$state.go('client.address', {
            client: _this.client
          }, {
            reload: true
          });
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
