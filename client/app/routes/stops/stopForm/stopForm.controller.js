'use strict';
(function() {

  class StopFormComponent {

    showClient = false;

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
    }, {
      key: 'stopAction',
      type: 'select',
      templateOptions: {
        label: 'Action',
        options: [{
          "name": "Pickup",
          "value": 1
        }, {
          "name": "Deliver",
          "value": 2
        }]
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
        label: 'Comments',
        required: true
      }
    }];

    constructor($scope, $stateParams, factoryRoutes, factoryClients, $timeout, $state, noty, AddressHandler, $log, $uibModal) {
      this.$log = $log;
      this.factoryClients = factoryClients;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.AddressHandler = AddressHandler;
      var _this = this;
      this.noty = noty;

      this.route = $stateParams.route;
      this.$state = $state;
      this.place = null;

      this.stop = $stateParams.stop;

      this.factoryRoutes = factoryRoutes;
      if (this.route == null) {
        this.$state.go('routes.all', null, {
          reload: true
        });
      } else {
        if (this.stop.type == null || this.stop.type == undefined){
          this.stop.type = 0;
        }else{
          this.showClient = true;
        }
        this.title = "New stop";
        this.newAddress = true;
        if (this.stop != null && this.stop.idStops != null) {
          this.newAddress = false;
          this.title = "Edit stop";
          // load address
          this.factoryRoutes.getAddressByStop(this.stop.type, this.stop.idAddress).then(function(response){
            _this.stop.address = response;
            _this.AddressHandler.setAddress(_this.stop.address);
            // get
            if (_this.stop.type == 1) {
              _this.factoryClients.getClientByIdAddress(_this.stop.idAddress).then(function(result){
                // defaulting out to 0
                _this.stop.client = result[0];


                _this.$log.info("complete Object: " + JSON.stringify(_this.stop));

              });
            }else{
              _this.initMap();
              _this.$log.info("complete Object: " + JSON.stringify(_this.stop));
            }
          });

        } else {
          this.stop.stopAction = 1;
          this.stop.type = 0;
        }
        this.title = this.title + " Route: " + this.route.name;
        if (this.stop.type == 0){
          // do nothing
        }
      }
      this.updateFormStatus();
    }

    mapInitialized = false;
    initMap(){
      var _this = this;
      if (!this.mapInitialized){
        this.mapInitialized = true;

        this.$timeout(function() {
          _this.AddressHandler.initMap();
          _this.AddressHandler.setAddress(_this.stop.address);

          if (_this.stop.address != null) {
            _this.AddressHandler.addExistingMarker();
          }

        }, 100);
      }else{
        _this.AddressHandler.setAddress(_this.stop.address);
      }
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
      if (_this.stop.idStops != null && _this.stop.idStops > 0) {
        _this.factoryRoutes.updateStopCallback(_this.stop, function() {
          _this.$state.go('routes.edit', {
            route: _this.route
          }, {
            reload: true
          });
        });
      } else {
        _this.factoryRoutes.saveStopCallback(_this.stop, function() {
          _this.$state.go('routes.edit', {
            route: _this.route
          }, {
            reload: true
          });
        });
      }
    }

    showClientInfo() {
      var _this = this;
      if (this.showClient) {
        this.stop.type = 1;
      } else {
        this.stop.type = 0;
        this.initMap();
      }
      this.stop.address = null;
      // shoow Modal for search clients...
    }


    openClientSearch() {
      var clientInfo = {};
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/clients/clientSearchModal/clientSearchModal.html',
        controller: 'ClientSearchModalCtrl',
        size: 'lg',
        resolve: {
          clientInfo: function() {
            return clientInfo;
          }
        }
      });

      modalInstance.result.then(function(client) {
        _this.stop.client = client;
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
