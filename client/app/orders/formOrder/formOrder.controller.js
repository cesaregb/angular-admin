'use strict';
(function () {

  class FormOrderComponent {
    order = {};
    title = 'Nueva Orden.';
    orderComplete = false;

    pickUpOpen = false;
    deliverOpen = false;
    status = {isopen: false};

    constructor($scope, $stateParams, $state, $log, $uibModal, $confirm, factoryServices, NgTableParams, _, constants, appContext, messageHandler, AddressHandler, $q) {
      this.NgTableParams = NgTableParams;
      this.$q = $q;
      this.AddressHandler = AddressHandler;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.$state = $state;
      this.place = null;
      this.$stateParams = $stateParams;
      this._ = _;
      this.store = constants.store;
      this.messageHandler = messageHandler;
      this.appContext = appContext;
    };

    $onInit() {
      let _this = this;
      this.order = {};
      if (Boolean(this.$stateParams.order)) {
        this.order = this.$stateParams.order;
      }
      this.order.transport = (Boolean(this.order.transport) && this.order.transport.length > 0) ?
        this.order.transport
        : [{date: new Date(), address: null, price: 0}, {date: new Date(), address: null, price: 0}];
      this.order.services = (Boolean(this.order.services)) ? this.order.services : [];
      this.order.client = (Boolean(this.order.client)) ? this.order.client : {};
      this.order.totalTransport = (Boolean(this.order.totalTransport)) ? this.order.totalTransport : 0;
      this.order.discount = (Boolean(this.order.discount)) ? this.order.discount : 0;
      _this.validateOrder();
      _this.calculateTotal(); // calculate total in case we are comming from services...

      this.tableParams = new this.NgTableParams({}, {
        dataset: _this.order.services
      });

      this.AddressHandler.resetValues();
    }

    removeService(service, index) {
      let _this = this;
      _this.order.services.splice(index, 1);
      _this.tableParams.reload();
      _this.validateOrder();
      _this.calculateTotal();
    }

    calculateTotal() {
      this.order.totalTransport = this._.reduce(this.order.transport, function (memo, tObj) {
        return memo + tObj.price;
      }, 0);
      this.order.totalServices = this._.reduce(this.order.services, function (memo, sObj) {
        return memo + sObj.totalPrice;
      }, 0);
      this.order.total = this.order.totalServices + this.order.totalTransport - this.order.discount;
    }

    openClientSearch() {
      let _this = this;
      let clientSearchInfo = null;
      if (Boolean(this.order.client) && Boolean(this.order.client.name)) {
        clientSearchInfo = this.order.client.name;
      }
      this.order.client = {};
      let modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/clients/clientSearchModal/clientSearchModal.html',
        controller: 'ClientSearchModalCtrl',
        size: 'lg',
        resolve: {
          clientSearchInfo: function () {
            return clientSearchInfo;
          }
        }
      });

      modalInstance.result.then(client => {
        if (Boolean(client)) {
          _this.calculateTotal();
          _this.order.client = client;
          if (_this.order.client.address.length > 0) {
            _this.order.client.address.push({
              address: "Ninguna",
              idAddress: 0,
            });
          }
        } else {
          _this.messageHandler.showError('Favor de seleccionar un cliente');
        }
      }, () => {
        _this.cleanOrder();
      });
    }

    cleanOrder() {
      this.order = {};
    }

    selectAddress(type, address) {
      let _this = this;
      this.AddressHandler.calculateDistancePriceByAddress(address).then(() => {
        _this.order.transport[(type - 1)].price = this.AddressHandler.distancePrice;
        _this.calculateTotal();
      });
    }

    openServiceDetails(service) {
      let modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/orders/formOrder/viewServiceDetailsModal/viewServiceDetailsModal.html',
        controller: 'ViewServiceDetailsModalCtrl',
        size: 'md',
        resolve: {
          service: function () {
            return service;
          }
        }
      });

      modalInstance.result.then(function (info) {
      });
    }

    selectDiscount(){
      let modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/modals/selectDiscountModal/selectDiscountModal.html',
        controller: 'SelectDiscountModalCtrl',
        size: 'md',
        resolve: {
          something: function () {
            return {};
          }
        }
      });

      modalInstance.result.then( (info) =>{
        this.order.discount += info.amount;
      });
    }

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

    castOrderObject() {
      let t = this;
      let orderObject = {}
      let errors = []; // as we go thru the process more than 1 error may occur...

      orderObject.paymentInfo = {transactionInfo: 'cash', type: 0};
      orderObject.comments = ''; // not used so far...

      orderObject.paymentStatus = this.order.paymentStatus;

      orderObject.idClient = this.order.client.idClient;
      orderObject.total = this.order.total;
      orderObject.discount = this.order.discount;
      orderObject.totalServices = this._.reduce(this.order.services, function (memo, sObj) {
        return memo + sObj.totalPrice;
      }, 0);

      // parse transport to remove address...
      orderObject.transport = this._.map(this.order.transport, (t) => {
        t.idAddress = (Boolean(t.address)) ? t.address.idAddress : 0;
        t.address = null;
        return t;
      });

      orderObject.services = [];
      this.order.services.forEach(function (item) {
        let tmpService = {};
        tmpService.idServiceType = item.idServiceType;
        tmpService.comments = item.comments;
        tmpService.price = item.total;
        tmpService.products = item.products;

        // due the format we request specs, we have to parse the specs
        tmpService.specs = [];
        item.specs.forEach(function (spec) {
          if (Boolean(spec.specsValue)) {
            let tmpSpec = {};
            tmpSpec.idSpecs = spec.idSpecs;
            tmpSpec.value = spec.specsValue.key;
            tmpSpec.quantity = spec.qty;
            tmpSpec.price = spec.price;
            tmpService.specs.push(tmpSpec);
          }
        });
        orderObject.services.push(tmpService);
      });

      if (orderObject.services.length === 0) {
        errors.push('Seleccionar cuandomenos un servicio');
      }

      if (errors.length > 0) {
        t.messageHandler.showError('Error:' + errors.join(', '));
        return null;
      } else {
        return orderObject;
      }

    }

    addService() {
      this.$state.go('orders.selectService', {order: this.order}, {reload: true});
    }

    validateOrder() {
      let _this = this;
      if (_this.order.services.length > 0 && Boolean(_this.order.client)) {
        _this.orderComplete = true;
      }
    }

    saveOrder() {
      let _this = this;
      let orderObj = this.castOrderObject();
      if (Boolean(orderObj)) {
        this.factoryServices.saveOrder(orderObj).then(function (item) {
          _this.back();
        }, function (err) {
          _this.messageHandler.showError('Error:' + err.message);
        });
      }
    };

    applyPaymentDiscount(){
      if (this.order.paymentStatus){
        this.order.discount += 5;
      }else{
        this.order.discount -= 5;
      }
    }

    back() {
      this.$state.go('orders.ordersList', {status: 'open'}, {reload: true});
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
