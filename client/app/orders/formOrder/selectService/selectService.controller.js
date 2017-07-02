'use strict';

(function () {

  class SelectServiceComponent {
    COST_TYPE_PERCENTAGE = 0;
    COST_TYPE_FIXED = 1;

    constructor(factoryServices, $log, $uibModal, _, $stateParams, $state, messageHandler) {
      this.factoryServices = factoryServices;
      this.$log = $log;
      this.$stateParams = $stateParams;
      this.$state = $state;
      this._ = _;
      this.$uibModal = $uibModal;
      this.messageHandler = messageHandler;
      this.products = [];
    }

    $onInit() {
      if (this.$stateParams.order) {
        this.order = this.$stateParams.order;
      } else {
        this.$state.go('orders.formOrder', null, { reload: true });
      }

      let _this = this;
      this.service = null;
      this.serviceCategories = [];

      this.factoryServices.getServiceOrderDetails().then(function (response) {
        _this.serviceCategories = response;
        _this.serviceCategories.sort(function (a, b) {
          return parseFloat(a.idServiceCategory) - parseFloat(b.idServiceCategory);
        });

      });
    }

    serviceShortcut(idServiceType) {
      let t = this;
      this.findServiceType(idServiceType, (err, serviceType) => {
        if (serviceType) {
          t.selectService(serviceType);
        } else {
          this.messageHandler.showError('Servicio no encontrado');
        }
      });
    }

    findServiceType(id, cb) {
      let t = this;
      let found = false;
      this.serviceCategories.forEach((sc) => {
        let serviceType = this._.find(sc.serviceTypes, function (st) {
          return st.idServiceType === id;
        });
        if (Boolean(serviceType)) {
          t.serviceCategorie = sc;
          cb(null, serviceType);
          found = true;
        }
      });
      if (!found) {
        return cb({err: 'not_found'}, null);
      }
    }

    selectService(serviceType) {
      this.serviceType = serviceType;
      this.products = serviceType.products;

      let _this = this;
      _this.service = {};

      _this.service = serviceType;
      _this.service.products = [];
      _this.service.specsPrice = 0;
      _this.service.productsPrice = 0;
      _this.service.totalPrice = 0;

      this.calculatePrice();
      if (Boolean(_this.service.specs)) {
        // sort to ensure consistency
        _this.service.specs.sort(function (a, b) {
          return parseFloat(a.idSpecs) - parseFloat(b.idSpecs);
        });

        // add spec info.
        _this.service.specs.forEach(function (spec) {
          spec.price = 0;
          spec.amt = 0;
          spec.quantity = 0;
        });

        _this.service.price = parseFloat(serviceType.price);
        this.preselectValues();
        this.calculateSpecsPrice();

      } else {
        this.messageHandler.showError('Servicio no tiene specs');
      }
    }

    selectSpecOption(selectedSpec, specsValue) {
      specsValue.quantity = 1;
      let _this = this;
      // TODO should we search for the item?
      let spec = this._.find(this.service.specs, (item) => {
        return (item.idSpecs === selectedSpec.idSpecs)
      });
      if (Boolean(spec)) {
        spec.quantity = 1;
        spec.specsValue = specsValue;
        if (specsValue.costType === _this.COST_TYPE_PERCENTAGE) {
          spec.amt = specsValue.serviceIncrement;
          spec.type = "%";
        } else if (specsValue.costType === _this.COST_TYPE_FIXED) {
          spec.amt = specsValue.specPrice;
          spec.type = "$";
        }
      }
      this.calculateSpecsPrice();
    }

    /**
     * preselect values for specs
     */
    preselectValues() {
      let _this = this;
      this.service.specs.forEach(function (spec) {
        if (!spec.optional) {
          _this.selectSpecOption(spec, spec.options[spec.idSpecs][0]);
        }
      });
    }

    calculateSpecsPrice() {
      let _this = this;
      if (!Boolean(this.service.products) || this.service.products.length < 1) {
        return;
      }

      let basePrice = this.service.productsPrice + this.service.price;
      let specsPrice = 0;

      // calculate based on $
      _this.service.specs.forEach(function (spec) {
        if (spec.type === '$') {
          spec.price = spec.amt * spec.quantity;
          specsPrice += spec.price;
        } else if (spec.type === '%') {
          spec.price = ((spec.amt / 100) * basePrice) * spec.quantity;
          specsPrice += spec.price;
        }
      });

      _this.service.specsPrice = specsPrice;
      this.calculatePrice();
    }

    calculatePrice() {
      this.service.totalPrice = this.service.price + this.service.specsPrice + this.service.productsPrice;
    }

    changeQty() {
      this.calculateSpecsPrice();
    }

    addProduct2Multiple(product) {
      this.service.products = (Boolean(this.service.products)) ? this.service.products : [];
      this.service.products = this.filterProduct(product);
      this.service.products.push(product);
      this.calculateSpecsPrice();
      this.calculateProductsTotal();
    }

    addProduct(product) {
      this.service.products = [];
      this.service.products.push(product);
      this.calculateSpecsPrice();
      this.calculateProductsTotal();
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
          },
          products: ()=>{
            return this.products;
          }
        }
      });

      modalInstance.result.then((product) => {
        product.quantity = 1;
        this.addProduct(product);
      });
    }

    deleteProduct(product) {
      this.service.products = this.filterProduct(product);
      this.calculateProductsTotal()
    }

    filterProduct(product) {
      return this._.filter(this.service.products, (p) => {
        return p.idProduct !== product.idProduct;
      });
    }

    calculateProductsTotal() {
      let productsTotal = 0;
      this.service.products.forEach(function (product) {
        product.total = product.price * product.quantity;
        productsTotal += product.total;
      });

      this.service.productsPrice = productsTotal;
      this.calculatePrice()
    }

    addService() {
      this.order.services = (Boolean(this.order.services)) ? this.order.services : [];
      let selectedProducts = [];
      this.service.products.forEach(function (product) {
        if (product.quantity > 0) {
          selectedProducts.push(product);
        }
      });
      this.service.selectedProducts = selectedProducts;
      this.order.services.push(this.service);
      this.$state.go('orders.formOrder', {order: this.order, addService: true}, {reload: true});
    }

    cancel() {
      this.order.services = (Boolean(this.order.services)) ? this.order.services : [];
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
