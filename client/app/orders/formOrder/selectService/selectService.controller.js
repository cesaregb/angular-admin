'use strict';

(function () {

  class SelectServiceComponent {

    constructor(factoryServices, $log, noty, $uibModal, _, $stateParams, $state) {
      this.message = 'Hello';
      this.factoryServices = factoryServices;
      this.$log = $log;
      this.noty = noty;
      this.$stateParams = $stateParams;
      this.$state = $state;
      this._ = _;
      this.$uibModal = $uibModal;
      this.selectedService = false;
    }

    $onInit() {
      if (this.$stateParams.order){
        this.order = this.$stateParams.order;
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
      var _this = this;
      _this.service = {};


      _this.service = serviceType;
      _this.service.composedPrice = _this.service.price;
      _this.service.totalPrice = _this.service.price;

      if (Boolean(_this.service.specs)) {
        // sort to ensure consistency
        _this.service.specs.sort(function (a, b) {
          return parseFloat(a.idSpecs) - parseFloat(b.idSpecs);
        });

        _this.service.specs.forEach(function (item) {
          item.price = 0;
          item.amt = 0;
          item.qty = 1;
        });

        _this.service.price = parseFloat(serviceType.price);
        this.preselectValues();
        this.calculatePrice();
      } else {
        _this.noty.showNoty({
          text: "Servicio no tiene specs... ",
          ttl: 1000 * 2,
          type: "warning"
        });
      }
    }

    selectSpecOption(workingWithSpec, specsValue) {
      var _this = this;
      // spec price ==
      _this.service.specs.forEach(function (item) {
        if (item.idSpecs == workingWithSpec.idSpecs) {
          if (specsValue.costType === 0) {
            item.amt = specsValue.serviceIncrement;
            item.type = "%";
          } else {
            item.amt = specsValue.specPrice;
            item.type = "$";
          }
        }
      });
      this.calculatePrice();
    }


    preselectValues() {
      // preselect all the base elements...
      this.service.specs.forEach(function (item) {
        if (( item.primarySpec || item.optional == 0 ) && !Boolean(item.type)) {

          item.specsValue = item.options[item.idSpecs][0];

          if (item.specsValue.costType === 0) {
            item.amt = item.specsValue.serviceIncrement;
            item.type = "%";
          } else {
            item.amt = item.specsValue.specPrice;
            item.type = "$";
          }

        }
      });
    }

    calculatePrice() {
      var _this = this;
      _this.service.totalPrice = _this.service.price;
      _this.service.composedPrice = _this.service.price;

      // get base price... based on $
      _this.service.specs.forEach(function (item) {
        if (item.primarySpec && item.type == "$") {
          item.price = item.amt * item.qty;
          _this.service.composedPrice = _this.service.composedPrice + item.price;
        }
      });

      // both base add up to the price... the rest to the totalPrice
      // get base price... based on $
      _this.service.specs.forEach(function (item) {
        if (item.primarySpec && item.type == "%") {
          item.price = ((item.amt * item.qty) / 100) * _this.service.price;
          _this.service.composedPrice = _this.service.composedPrice + item.price;
        }
      });

      // calculate the percentage for the rest of the elements..
      _this.service.totalPrice = _this.service.composedPrice;

      _this.service.specs.forEach(function (item) {
        if (!item.primarySpec && item.type == "%") {
          // calculate line price before adding it to the total.
          item.price = ((item.amt * item.qty) / 100) * _this.service.composedPrice;
          // add calculated to the total
          _this.service.totalPrice = _this.service.totalPrice + item.price;
        } else if (!item.primarySpec && item.type == "$") {
          item.price = item.amt * item.qty;
          _this.service.totalPrice = _this.service.totalPrice + item.price;
        }
      });
    }

    manageSubproducts(){
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/subproducts/subproductSearchModal/subproductSearchModal.html',
        controller: 'SubproductSearchModalCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function(subproduct) {
        // _this.$log.info('[manageSubproducts] subproduct: ' + JSON.stringify(subproduct, null, 2));

        if (!Boolean(this.service.subproducts)){
          this.service.subproducts = [];
        }

        var found = false;

        this.service.subproducts.forEach(function(item){
          if (item.idSubproduct == subproduct.idSubproduct){
            found = true;
            item = subproduct;
          }
        });

        if (!found){
          this.service.subproducts.push(subproduct);
        }

      }.bind(this));
    }

    calculateSubproductoTotal(subproduct){
      subproduct.total = subproduct.price * subproduct.quantity;
    }

    addService(){
      if (!Boolean(this.order.services)){
        this.order.services = [];
      }
      this.order.services.push(this.service);
      this.$state.go('orders.formOrder',{order: this.order} , { reload: true });
    }

  }

  angular.module('processAdminApp')
    .component('selectService', {
      templateUrl: 'app/orders/formOrder/selectService/selectService.html',
      controller: SelectServiceComponent,
      controllerAs: '$cn'
    });

})();
