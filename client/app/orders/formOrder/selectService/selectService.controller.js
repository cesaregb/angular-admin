'use strict';

(function () {

  class SelectServiceComponent {
    COST_TYPE_PERCENTAGE = 0;
    COST_TYPE_FIXED = 1;

    constructor(factoryServices, $log, noty, $uibModal, _, $stateParams, $state) {
      this.factoryServices = factoryServices;
      this.$log = $log;
      this.noty = noty;
      this.$stateParams = $stateParams;
      this.$state = $state;
      this._ = _;
      this.$uibModal = $uibModal;
    }

    $onInit() {
      if (this.$stateParams.order) {
        this.order = this.$stateParams.order;
      } else {
        // this.$state.go('orders.formOrder', null, { reload: true });
      }

      var _this = this;
      this.service = null;
      this.serviceCategories = [];

      this.factoryServices.getServiceOrderDetails().then(function (response) {
        _this.serviceCategories = response;

        if (Boolean(_this.selectedService)) {
          // if open selected service...
          _this.service = selectedService;
          var indexCat = -1;
          var indexSt = -1;

          response.forEach(function (item, index) {

            item.serviceTypes.forEach(function (st, index2) {
              if (st.idServiceType == _this.service.idServiceType) {
                indexCat = index;
                indexSt = index2;
              }
            });
          });

          _this.serviceCategorie = response[indexCat];
          _this.serviceType = response[indexCat].serviceTypes[indexSt];

          if (Boolean(selectedService.savedService)) {
            _this.calculatePrice();
          } else {
            _this.service = {};
          }
        }

      });
    }

    selectService(serviceType) {
      let _this = this;
      _this.service = {};

      _this.service = serviceType;
      _this.service.specsPrice = 0;
      _this.service.productsPrice = 0;
      _this.service.servicePrice = 0;
      this.calculatePrice();

      if (Boolean(_this.service.specs)) {
        // sort to ensure consistency
        _this.service.specs.sort(function (a, b) {
          return parseFloat(a.idSpecs) - parseFloat(b.idSpecs);
        });

        _this.service.specs.forEach(function (item) {
          item.price = 0;
          item.amt = 0;
          item.quantity = 1;
        });

        _this.service.price = parseFloat(serviceType.price);
        this.preselectValues();
        this.calculateSpecsPrice();

      } else {
        _this.noty.showNoty({
          text: "Servicio no tiene specs... ",
          ttl: 1000 * 2,
          type: "warning"
        });
      }
    }

    selectSpecOption(selectedSpec, specsValue) {
      specsValue.quantity = 1;
      let _this = this;
      this.service.specs.forEach((item) => {
        if (item.idSpecs == selectedSpec.idSpecs) {

          if (specsValue.costType === _this.COST_TYPE_PERCENTAGE) {
            item.amt = specsValue.serviceIncrement;
            item.type = "%";
          } else if (specsValue.costType === _this.COST_TYPE_FIXED) {
            item.amt = specsValue.specPrice;
            item.type = "$";
          }
        }
      });

      this.calculateSpecsPrice();
    }

    preselectValues() {
      let _this = this;
      // preselect all the base elements...
      this.service.specs.forEach(function (item) {
        if (( item.primarySpec || item.optional == 0 ) && !Boolean(item.type)) {
          item.specsValue = item.options[item.idSpecs][0];
          if (item.specsValue.costType === _this.COST_TYPE_PERCENTAGE) {
            item.amt = item.specsValue.serviceIncrement;
            item.type = "%";
          } else if (item.specsValue.costType === _this.COST_TYPE_FIXED) {
            item.amt = item.specsValue.specPrice;
            item.type = "$";
          }
        }
      });
    }

    calculateSpecsPrice() {
      let _this = this;
      if (!Boolean(this.service.products) || this.service.products.length < 1) {
        this.noty.showNoty({
          text: 'Tenemos que seleccionar cuandomenos 1 producto',
          ttl: 1000 * 4,
          type: 'warning'
        });
        return;
      }

      let basePrice = this.service.productsPrice + this.service.price;
      let specsPrice = 0;

      // calculate based on $
      _this.service.specs.forEach(function (item) {
        if (item.type == "$") {
          item.price = item.amt * item.quantity;
          specsPrice += item.price;
        }
      });

      // calculate based on % of basePrice
      _this.service.specs.forEach(function (item) {
        if (item.type == "%") {
          item.price = ((item.amt / 100) * basePrice) * item.quantity;
          specsPrice += item.price;
        }
      });

      _this.service.specsPrice = specsPrice;
      this.calculatePrice();
    }

    calculatePrice() {
      this.service.servicePrice = this.service.price + this.service.specsPrice + this.service.productsPrice;
    }

    changeQty() {
      this.calculateSpecsPrice();
    }

    manageProducts() {
      let _this = this;
      let modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/products/productSearchModal/productSearchModal.html',
        controller: 'ProductSearchModalCtrl',
        size: 'lg',
        resolve: {
          serviceType: function () {
            return _this.serviceType;
          }
        }
      });

      modalInstance.result.then(function (product) {
        product.quantity = 1;
        this.service.products = (Boolean(this.service.products)) ? this.service.products : [];
        // remove product if exist, and add it back again.
        this.service.products = this._.filter(this.service.products, (p) => {
          return p.idProduct == product.idProduct;
        });
        this.service.products.push(product);

        this.calculateProductsTotal();
      }.bind(this));
    }

    deleteProduct(product) {
      this.service.products = this._.filter(this.service.products, (p) => {
        return p.idProduct == product.idProduct;
      });
      this.calculateProductsTotal()
    }

    calculateProductsTotal() {
      var productsTotal = 0;
      this.service.products.forEach(function (item) {
        item.total = item.price * item.quantity;
        productsTotal += item.total;
      });

      this.service.productsPrice = productsTotal;
      this.calculatePrice()
    }

    addService() {
      if (!Boolean(this.order.services)) {
        this.order.services = [];
      }
      this.order.services.push(this.service);
      this.$state.go('orders.formOrder', {order: this.order, addService: true}, {reload: true});
    }

    cancel() {
      if (!Boolean(this.order.services)) {
        this.order.services = [];
      }
      this.$state.go('orders.formOrder', {order: this.order, addService: true}, {reload: true});
    }

  }

  angular.module('processAdminApp')
    .component('selectService', {
      templateUrl: 'app/orders/formOrder/selectService/selectService.html',
      controller: SelectServiceComponent,
      controllerAs: '$cn'
    });

})();
