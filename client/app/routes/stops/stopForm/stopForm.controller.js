'use strict';
(function() {

  class StopFormComponent {

    formOptions = {
      formState: {
        disabled: true
      }
    };

    stopFieldsGeneral = [{
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name'
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Description'
      }
    }, {
      key: 'time',
      type: 'input',
      templateOptions: {
        type: 'text',
        placeholder: '20',
        label: 'Time (minutes)'
      }
    }, {
      key: 'arriveAt',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Arrive At',
        placeholder: '9:30',
        required: true
      }
    }];

    stopFields = [{
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
        label: 'Comments'
      }
    }];

    types = [{
      name: 'Address',
      value: 0
    }, {
      name: 'Client',
      value: 1
    }];

    constructor($scope, $stateParams, factoryRoutes, factoryClients, $timeout, $state, noty, AddressHandler, $log, $uibModal, $confirm) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryClients = factoryClients;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.AddressHandler = AddressHandler;
      this.noty = noty;
      this.route = $stateParams.route;
      this.$state = $state;
      this.place = null;
      this.stop = $stateParams.stop;
      this.factoryRoutes = factoryRoutes;

      var _this = this;
      if (this.route == null) {
        this.back()
      } else {
        this.title = "New stop";

        if (this.stop != null && this.stop.idStops != null) {
          this.newAddress = false;
          this.title = "Edit stop";
          // load address
          this.factoryRoutes.getAddressByStop(this.stop.type, this.stop.idAddress).then(function(response) {
            _this.stop.address = response;

            if (_this.stop.type == 1) { // get the client in case of client type
              _this.factoryClients.getClientByIdAddress(_this.stop.idAddress).then(function(result) {
                _this.stop.client = result[0];
                _this.stop.client.addresses.forEach(function(item) {
                  if (item.idAddress == _this.stop.idAddress) {
                    _this.stop.address = item;
                  }
                });
              });
            } else {
              _this.initMap();
            }
          });

        } else {
          this.stop.type = 0;
          this.newAddress = true;
          this.stop.stopAction = 1;
          // new item.
          this.initMap();

        }

        this.title = this.title + " Route: " + this.route.name;
      }

      this.updateFormStatus(); // formly dissabled!!

    }

    mapInitialized = false;
    initMap() {
      var _this = this;
      if (!this.mapInitialized) {
        this.mapInitialized = true;

        this.$timeout(function() {

          _this.AddressHandler.initMap();
          _this.AddressHandler.setAddress(_this.stop.address);
          if (_this.stop.address != null) {
            _this.AddressHandler.addExistingMarker();
          }

        }, 500);

      }
    }

    changeType() {
      if (this.stop.type == 0) {
        this.initMap();
        this.stop.client = null;
      }
      this.stop.address = null;
    }

    updateFormStatus() {
      angular.forEach(this.stopFields, function(field) {
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
      this.stop.address = this.AddressHandler.address;
    }

    saveStop() {
      var _this = this;
      _this.stop.idAddress = _this.stop.address.idAddress;

      if (_this.stop.idStops != null && _this.stop.idStops > 0) {
        _this.factoryRoutes.updateStopCallback(_this.stop, function() {
          _this.back();
        });
      } else {
        _this.factoryRoutes.saveStopCallback(_this.stop, function() {
          _this.back();
        });
      }
    }

    openClientSearch() {
      var clientSearchInfo = {};
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/clients/clientSearchModal/clientSearchModal.html',
        controller: 'ClientSearchModalCtrl',
        size: 'lg',
        resolve: {
          clientSearchInfo: function() {
            return clientSearchInfo;
          }
        }
      });

      modalInstance.result.then(function(client) {
        _this.stop.idAddress = client.idAddress;
        _this.stop.client = client;
      });
    }

    delete() {
      var _this = this;
      this.$confirm({
          text: 'Are you sure you want to delete?'
        })
        .then(function() {
          _this.factoryRoutes.deleteStop(_this.stop).then(function(info) {
            _this.back();
          });
        });
    }

    back() {
      this.$state.go('routes.stopsAll', {
        route: this.route
      }, {
        reload: true
      });
    }
  }

  angular.module('processAdminApp')
    .component('stopForm', {
      templateUrl: 'app/routes/stops/stopForm/stopForm.html',
      controller: StopFormComponent,
      controllerAs: '$cn'
    });

})();
