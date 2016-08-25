'use strict';
(function() {

  class FormOrderComponent {
    order = {};
    title = "Nueva Orden.";
    orderTypes = [];
    pickupShow = false;
    showDeliver = false;
    orderComplete = false;

    status = { isopen: false };

    constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, formlyForms, NgTableParams, _) {
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.place = null;
      this.$stateParams = $stateParams;

      this.init();
    };

    init() {
      var _this = this;


      if (Boolean(this.$stateParams.order)) {
        // load order...
        this.order = this.$stateParams.order;

        // this.factoryServices.getUIOrder(this.$stateParams.order.idOrder).then(function (response) {
        //   this.order.savedObject = response;
        // }.bind(this));

        _this.factoryServices.getServiceOrderDetails().then(function(response) {

          var serviceCategories = response;
          var serviceCategoriesHash = {};

          serviceCategories.forEach(function (item) {
            serviceCategoriesHash[item.idServiceCategory] = item;
          });

          var servicesHolder = [];
          _this.order.services.forEach(function(helper){
            var serviceType = _.find(serviceCategoriesHash[helper.idServiceCategory].serviceTypes, function(search){
              return search.idServiceType == helper.idServiceCategory;
            });
            var item = serviceType;
            item.price = helper.price;
            item.composedPrice = helper.composedPrice;
            item.totalPrice = helper.totalPrice;
            item.savedService = helper;

            item.specs.forEach(function (item) {
              var ss = _.find(helper.serviceSpecs, function(specF){ return specF.spec.idSpecs == item.idSpecs; });
              var specsValue = _.find(item.options[item.idSpecs], function(search){ return search.key == parseInt(ss.selectedValue); });

              item.amt = 0; // this needs to be calculated..
              item.qty = ss.quantity;
              // price calculation... ??? 
              if (specsValue.costType == 0){
                item.type = "%";
                item.amt = specsValue.serviceIncrement;
              }else{
                item.type = "$";
                item.amt = specsValue.specPrice;
              }

              item.specsValue = specsValue;
            });
            servicesHolder.push(item);
          });

          _this.order.services = servicesHolder;

          _this.tableParams = new _this.NgTableParams({}, {
            dataset: _this.order.services
          });

          _this.tableParams.reload();
        });

      }else{
        this.order = {};
        if (!Boolean(this.order.services)){
          this.order.services = [];
        }

        if (!Boolean(this.order.client)){
          this.order.client = {};
        }
      }


      if (Boolean(_this.order.idAddressPickup)){
        _this.order.pickup = {};
        _this.order.pickup.address = _.find(_this.order.client.addresses, function(address){
          return address.idAddress === _this.order.idAddressPickup;
        });
      }

      if (Boolean(_this.order.idAddressDeliver)){
        _this.order.deliver = {};
        _this.order.deliver.address = _.find(_this.order.client.addresses, function(address){
          return address.idAddress === _this.order.idAddressDeliver;
        });
      }

      // setting order information for existing order
      this.factoryServices.getResources('orderType').then(function(result) {
        _this.orderTypes = _.filter(result, function(ot){ return (Boolean(ot.orderTypeTasks) && ot.orderTypeTasks.length > 0) ; });

        // select item if editing order
        if (Boolean(_this.order)){
          _this.selectedOrderType = _.find(result, function(ot){
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
      if (Boolean(this.selectedOrderType)){
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
    }

    saveOrder() {
      var _this = this;
      var orderObj = this.castOrderObject();
      // this.$log.info('[saveOrder] orderObj: ' + JSON.stringify(orderObj, null, 2));
      this.factoryServices.saveOrder(orderObj).then(function(item){
        _this.back();
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
      this.$state.go('orders.ordersList',{status: 'open'} , { reload: true });
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
      // this.$log.info('[calculateTotal] this.order.services: ' + this.order.services.length);
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
      // this logic cast the object from orderType to a new order.
      // doesnt match the exact structure of the db, save method is a custom object.
      var _this = this;
      var finalOrder = {}
      finalOrder.idClient = this.order.client.idClient;
      finalOrder.price = this.order.total;
      finalOrder.comments = '';
      if (this.selectedOrderType.transportInfo == 3 ||  this.selectedOrderType.transportInfo == 1){
        finalOrder.idAddressPickup = this.order.pickup.address.idAddress;
        finalOrder.pickUpDate = this.pickUpDate;
      }

      if (this.selectedOrderType.transportInfo == 3 ||  this.selectedOrderType.transportInfo == 2){
        finalOrder.idAddressDeliver = this.order.deliver.address.idAddress;
        finalOrder.deliveryDate = this.deliverDate;
      }

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
        tmpService.paymentInfo = {transactionInfo:'cash', type:0};

        finalOrder.services.push(tmpService);
      });
      return finalOrder;
    }

    // end class
  }

  angular.module('processAdminApp')
    .component('formOrder', {
      templateUrl: 'app/orders/formOrder/formOrder.html',
      controller: FormOrderComponent,
      controllerAs: '$cn'
    });
})();
