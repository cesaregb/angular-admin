'use strict';
(function() {

  class FormOrderComponent {
    order = {};
    title = 'Nueva Orden.';
    orderTypes = [];
    pickupShow = false;
    showDeliver = false;
    orderComplete = false;

    status = { isopen: false };

    constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, NgTableParams, _, googleMapsDirections, constants, appContext) {
      this.NgTableParams = NgTableParams;
      this.googleMapsDirections = googleMapsDirections;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.place = null;
      this.$stateParams = $stateParams;
      this._ = _;
      this.store = constants.store;
      this.storeInfo = null;
      this.appContext = appContext;
      this.init();

    };

    init() {
      let _this = this;
      _this.storeInfo = this.appContext.appContextObject.store;

      if (Boolean(this.$stateParams.order)) {
        // load order...
        this.order = this.$stateParams.order;
        _this.validateOrder();

      }else{
        // initialize values...
        this.order = {};
        this.order.pickupPrice = 0;
        this.order.deliverPrice = 0;
        this.order.pickUpDate = new Date();
        this.order.deliverDate = new Date();
        this.order.pickup = {address:null};
        this.order.deliver = {address:null};
        if ( !Boolean( this.order.services ) ){
          this.order.services = [];
        }

        if (!Boolean(this.order.client)){
          this.order.client = {};
        }
      }

      if (Boolean(_this.order.idAddressPickup)){
        _this.order.pickup = {};
        _this.order.pickup.address = _this._.find(_this.order.client.addresses, function(address){
          return address.idAddress === _this.order.idAddressPickup;
        });
      }

      if (Boolean(_this.order.idAddressDeliver)){
        _this.order.deliver = {};
        _this.order.deliver.address = _this._.find(_this.order.client.addresses, function(address){
          return address.idAddress === _this.order.idAddressDeliver;
        });
      }

      // setting order information for existing order
      this.factoryServices.getResources('orderType').then(function(result) {

        _this.orderTypes = _this._.filter(result, function(ot){
          return (Boolean(ot.orderTypeTask) && ot.orderTypeTask.length > 0) ;
        });

        // select item if editing order
        if (Boolean(_this.order)){
          _this.selectedOrderType = _this._.find(result, function(ot){
            return ot.idOrderType === _this.order.idOrderType
          });
          _this.validateOrderType();
        }
      });

      this.tableParams = new this.NgTableParams({}, {
        dataset: _this.order.services
      });
    }

    validateOrderType() {
      var _this = this;
      if (Boolean(this.selectedOrderType)){

        this.order.idOrderType = this.selectedOrderType.idOrderType;
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
            text: 'Cliente no tiene direccion dada de alta, por favor agrega una direccion, o selecciona otro servicio',
            ttl: 1000 * 4,
            type: 'warning'
          });
        }
        this.calculateTotal();
      }
    }

    saveOrder() {
      var _this = this;
      var orderObj = this.castOrderObject();
      if (Boolean(orderObj)){
        this.factoryServices.saveOrder(orderObj).then(function(item){
          _this.back();
          // ORDER SAVED Redirect me to order report...
        });
      }else{
        // wtf!!!
      }
    };

    removeService(service, index){
      var _this = this;
      _this.order.services.splice(index, 1);
      _this.tableParams.reload();
      _this.validateOrder();
    }

    back() {
      this.$state.go('orders.ordersList',{status: 'open'} , { reload: true });
    }

    validateOrder(){
      var _this = this;
      if (_this.order.services.length > 0 && Boolean(_this.order.client) && Boolean(_this.order.idOrderType)){
        _this.orderComplete = true;
      }
    }

    calculateTotal(){
      var _this = this;
      var total = _this.order.pickupPrice + _this.order.deliverPrice;

      var totalServices = 0;
      this.order.services.forEach(function(service){
        totalServices += service.totalPrice;
      });

      this.order.totalServices = totalServices;
      this.order.total = totalServices + total;
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
        _this.calculateTotal();
        _this.order.client = client;
      });
    }

    selectAddress(type, address){
      var _this = this;
      var start = this.googleMapsDirections.getLatLng(this.storeInfo.lat, this.storeInfo.lng);
      var end = this.googleMapsDirections.getLatLng(address.lat, address.lng);
      var request =  this.googleMapsDirections.getRequestObject(start, end);
      this.googleMapsDirections.getDistance(request).then(function (distance) {
        var kmDistance = distance/1000;
        var price = 0;
        var distanceInfoSorted = _this._.sortBy(_this.storeInfo.distanceInfos, 'distance');
        distanceInfoSorted.forEach(function (item) {
          if (item.distance > kmDistance && price === 0){
            price = item.price;
          }
        });
        // get the last price if is not covered ...
        if (price == 0 && distanceInfoSorted.length > 0){
          price = distanceInfoSorted[distanceInfoSorted.length -1].price;
        }

        if (type == 1){
          _this.order.pickupPrice = price;
        }else{
          _this.order.deliverPrice = price;
        }

        _this.calculateTotal();

      });
    }

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

    viewServiceDetails(service){
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/services/viewServiceModal/viewServiceModal.html',
        controller: 'ViewServiceModalCtrl',
        size: 'lg',
        resolve: {
          service: function() {
            return service;
          }
        }
      });

      modalInstance.result.then(function(client) {
        _this.order.client = client;
      });
    }

    castOrderObject (){
      // this logic cast the object from orderType to a new order.
      // doesnt match the exact structure of the db, save method is a custom object.
      var finalOrder = {}
      var errors = [];
      finalOrder.idClient = this.order.client.idClient;
      finalOrder.total = this.order.total;
      finalOrder.totalServices = this.order.totalServices;
      finalOrder.comments = '';

      if (this.selectedOrderType.transportInfo == 3 ||  this.selectedOrderType.transportInfo == 1){
        try{
          finalOrder.idAddressPickup = this.order.pickup.address.idAddress;
          finalOrder.pickUpDate = this.order.pickUpDate;
        }catch(ex){
          errors.push('Seleccionar Direccion y Fecha de recoleccion');
        }
      }

      if (this.selectedOrderType.transportInfo == 3 ||  this.selectedOrderType.transportInfo == 2){
        try{
          finalOrder.idAddressDeliver = this.order.deliver.address.idAddress;
          finalOrder.deliveryDate = this.order.deliverDate;
        }catch(ex){
          errors.push('Seleccionar Direccion y Fecha de entrega');
        }
      }


      finalOrder.paymentInfo = {transactionInfo:'cash', type:0 };

      finalOrder.services = [];
      this.order.services.forEach(function(item){
        var tmpService = {};
        tmpService.idServiceType = item.idServiceType;
        tmpService.comments = item.comments;
        tmpService.price = item.price;
        tmpService.totalPrice = item.totalPrice;
        tmpService.composedPrice = item.composedPrice;
        tmpService.specs = [];
        item.specs.forEach(function(spec){
          if (Boolean(spec.specsValue)){
            var tmpSpec = {};
            tmpSpec.idSpecs = spec.idSpecs;
            tmpSpec.value = spec.specsValue.key;
            tmpSpec.quantity = spec.qty;
            tmpSpec.price = spec.price;
            tmpService.specs.push(tmpSpec);
          }
        });

        tmpService.products = [];

        if (Boolean(item.products) && item.products.length > 0){
          item.products.forEach(function(products){
            var productItem = {};
            productItem.idProduct = products.idProduct;
            productItem.quantity = products.quantity;
            productItem.price = products.price;
            tmpService.products.push(productItem);
          });
        }

        finalOrder.services.push(tmpService);
      });
      if (finalOrder.services.length == 0){
        errors.push('Seleccionar cuandomenos un servicio');
      }

      if(errors.length > 0){
        this.noty.showNoty({
          text: 'Error:' + errors.join(', '),
          ttl: 1000 * 4,
          type: 'warning'
        });
        return null;
      }else{
        return finalOrder;
      }

    }

    addService(){
      this.$state.go('orders.selectService',{order: this.order} , { reload: true });
    }

  }

  angular.module('processAdminApp')
    .component('formOrder', {
      templateUrl: 'app/orders/formOrder/formOrder.html',
      authenticate: true,
      controller: FormOrderComponent,
      controllerAs: '$cn'
    });
})();
