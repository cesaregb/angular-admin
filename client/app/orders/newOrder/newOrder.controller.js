'use strict';
(function() {

  class NewOrderComponent {
    parentSelect = [];
    order = {};
    title = "Nueva Orden.";
    orderTypes = [];
    pickupShow = false;
    showDeliver = false;
    orderComplete = false;

    status = { isopen: false };

    constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, formlyForms, NgTableParams) {
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.place = null;
      if (Boolean($stateParams.order)) {
        this.order = $stateParams.order;
      }

      if (!Boolean(this.order.services)){
        this.order.services = [];
      }
      if (!Boolean(this.order.client)){
        this.order.client = {};
      }

      var _this = this;
      this.init();
    };

    init() {
      var _this = this;
      this.editMode = (Boolean(this.orderType) && Boolean(this.orderType.idOrder));
      if (Boolean(this.editMode)) {
        // do nothing
      }

      this.factoryServices.getResources('orderType').then(function(result) {
        _this.orderTypes = result;
      });

      this.tableParams = new this.NgTableParams({}, {
        dataset: _this.order.services
      });
    }

    validateOrderType() {
      this.pickupShow = false;
      this.showDeliver = false;
      var both = false;
      if (this.selectedOrderType.transportInfo == 3) {
        both = true;
      }
      if (this.selectedOrderType.transportInfo == 1 || both) {
        this.pickupShow = true;
      }
      if (this.selectedOrderType.transportInfo == 2 || both) {
        this.showDeliver = true;
      }

      if ((!Boolean(this.order.client.addresses) || this.order.client.addresses.length == 0)
          && (this.pickupShow || this.showDeliver)){

        this.selectedOrderType = null;
        this.pickupShow = false;
        this.showDeliver = false;

        this.noty.showNoty({
          text: "Cliente no tiene direccion dada de alta, por favor agrega una direccion, o selecciona otro servicio",
          ttl: 1000 * 4,
          type: "warning"
        });
      }
    }

    saveOrder() {
      var _this = this;
      var orderObj = this.castOrderObject();
      // this.$log.info('[saveOrder] orderObj: ' + JSON.stringify(orderObj, null, 2));
      this.factoryServices.saveOrder(orderObj).then(function(item){
        // ORDER SAVED Redirect me to order report...
      });
    };

    delete() {
      var _this = this;
      this.$confirm({
          text: 'Are you sure you want to delete?'
        })
        .then(function() {
          _this.factoryServices.deleteResource('orderType', _this.orderType.idOrder).then(function(info) {
            _this.back();
          });
        });
    };

    removeService(service, index){
      var _this = this;
      _this.order.services.splice(index, 1);
      _this.tableParams.reload();
      _this.validateOrder();
    }

    openService(service, index){
      var _this = this;
      this.updatingService = index;
      this.addService(service);
    }

    back() {
      this.$state.go('orders.orderType', null, {
        reload: true
      });
    }

    updatingService = -1;
    addService(selectedService){
      var _this = this;
      var orderType = this.selectedOrderType;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/services/addServiceModal/addServiceModal.html',
        controller: 'AddServicesModalCtrl',
        size: 'lg',
        resolve: {
          orderType: function() {
            return orderType;
          },
          selectedService: function() {
            return selectedService;
          }
        }
      });

      modalInstance.result.then(function(service) {
        // validate if is updating an existing service.
        if (_this.updatingService < 0){
          _this.order.services.push(service);
        }else{
          _this.order.services[_this.updatingService] = service;
        }

        _this.validateOrder();

        _this.tableParams.reload();
        _this.calculateTotal();
      }, function () {
        _this.updatingService = -1;
      });

    }

    validateOrder(){
      var _this = this;
      if (_this.order.services.length > 0 && Boolean(_this.order.client) && Boolean(_this.selectedOrderType)){
        _this.orderComplete = true;
      }
    }

    calculateTotal(){
      var _this = this;
      var total = 0;
      this.$log.info('[calculateTotal] this.order.services: ' + this.order.services.length);
      this.order.services.forEach(function(service){
        total += service.totalPrice;
      });
      this.order.total = total;
    }

    openClientSearch() {
      var clientSearchInfo = null;
      if (Boolean(this.order.client) && Boolean(this.order.client.name)){
          clientSearchInfo = this.order.client.name;
      }
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
        _this.order.client = client;
      });
    }

    pickUpDate = new Date();
    deliverDate = new Date();

    pickUpOpen = false;
    deliverOpen = false;

    openCalendar(e, m) {
      e.preventDefault();
      e.stopPropagation();
      if (m === 'pickUpDate') {
        this.pickUpOpen = !this.pickUpOpen;
        this.deliverOpen = false;
      } else if (m === 'deliverDate') {
        this.deliverOpen = !this.deliverOpen;
        this.pickUpOpen = false;
      }
    };

    castOrderObject (){
      var _this = this;
      var finalOrder = {}
      finalOrder.idClient = this.order.client.idClient;
      finalOrder.price = this.order.total;
      finalOrder.comments = '';
      if (this.selectedOrderType.transportInfo == 3 ||  this.selectedOrderType.transportInfo == 1){
        finalOrder.idAddressPickup = this.order.pickup.address.idAddress;
        finalOrder.pickUpDate = this.pickUpDate;
        finalOrder.pickUpComments = '';
      }

      if (this.selectedOrderType.transportInfo == 3 ||  this.selectedOrderType.transportInfo == 2){
        finalOrder.idAddressDeliver = this.order.deliver.address.idAddress;
        finalOrder.deliveryDate = this.deliverDate;
        finalOrder.deliveryComments = '';
      }

      finalOrder.services = [];
      this.order.services.forEach(function(item, index){
        var tmpService = {};
        tmpService.idServiceType = item.idServiceType;
        tmpService.comments = item.comments;
        tmpService.price = item.totalPrice;
        tmpService.specs = [];
        item.specs.forEach(function(spec, specIndex){
          if (Boolean(spec.specsValue)){
            var tmpSpec = {};
            tmpSpec.idSpecs = spec.idSpecs;
            tmpSpec.value = spec.specsValue.key;
            tmpSpec.quantity = spec.qty;
            tmpService.specs.push(tmpSpec);
          }
        });

        tmpService.paymentInfo = {transactionInfo:'cash', type:0};

        finalOrder.services.push(tmpService);
      });
      return finalOrder;
    }

    // end class
  }

  angular.module('processAdminApp')
    .component('newOrder', {
      templateUrl: 'app/orders/newOrder/newOrder.html',
      controller: NewOrderComponent,
      controllerAs: '$cn'
    });
})();
