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
      this.selectedService = false;
    }

    $onInit() {
      if (this.$stateParams.order){
        this.order = this.$stateParams.order;
      }else{
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
      var _this = this;
      _this.service = {};

      _this.service = serviceType;
      _this.service.specsPrice = 0;
      _this.service.subproductsPrice = 0;
      _this.service.totalPrice = 0;
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

    selectSpecOption(workingWithSpec, specsValue) {
      specsValue.quantity = 1;
      this.preselectValues();

      var _this = this;
      // spec price ==
      _this.service.specs.forEach(function (item) {
        // $log.info('[selectSpecOption] item.idSpecs == workingWithSpec.idSpecs: ' + item.idSpecs + ' -- ' + workingWithSpec.idSpecs);
        if (item.idSpecs == workingWithSpec.idSpecs) {
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
      var _this = this;
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
      var _this = this;
      _this.service.totalPrice = _this.service.price;
      _this.service.specsPrice = 0;

      var specsPrincipalPrice = 0;

      // get base price... based on $
      _this.service.specs.forEach(function (item) {
        if (item.primarySpec && item.type == "$") {
          item.price = item.amt * item.quantity;
          specsPrincipalPrice += item.price;
        }
      });

      // both base add up to the price... the rest to the totalPrice
      // get base price... based on $
      var percTot = 0;
      _this.service.specs.forEach(function (item) {
        if (item.primarySpec && item.type == "%") {
          item.price = ((item.amt * item.quantity) / 100) * (specsPrincipalPrice + _this.service.price);
          percTot = percTot + item.price;
        }
      });

      specsPrincipalPrice += percTot;

      // calculate the percentage for the rest of the elements..
      var specsNotPrincipalPrice = 0;

      _this.service.specs.forEach(function (item) {
        if (!item.primarySpec && item.type == "%") {
          // calculate line price before adding it to the total.
          item.price = ((item.amt * item.quantity) / 100) * specsPrincipalPrice;
          // add calculated to the total
          specsNotPrincipalPrice += item.price;
        } else if (!item.primarySpec && item.type == "$") {
          item.price = item.amt * item.quantity;
          specsNotPrincipalPrice += item.price;
        }
      });

      _this.service.specsPrice = specsPrincipalPrice + specsNotPrincipalPrice;

      this.calculatePrice();

    }

    calculatePrice(){
      this.service.totalPrice = this.service.price + this.service.specsPrice + this.service.subproductsPrice;
    }

    changeQty(){
      this.calculateSpecsPrice();
    }

    manageSubproducts(){
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/subproducts/subproductSearchModal/subproductSearchModal.html',
        controller: 'SubproductSearchModalCtrl',
        size: 'lg',
        resolve: {
          serviceType: function() {
            return _this.serviceType;
          }
        }
      });

      modalInstance.result.then(function(subproduct) {
        subproduct.quantity = 1;
        if (!Boolean(this.service.subproducts)){
          this.service.subproducts = [];
        }

        var found = -1;
        this.service.subproducts.forEach(function(item, index){
          if (item.idSubproduct == subproduct.idSubproduct){
            found = index;
          }
        });

        if (found >= 0){
          this.service.subproducts.splice(found, 1);
        }

        this.service.subproducts.push(subproduct);

        this.calculateSubproductTotal(subproduct);

      }.bind(this));
    }

    deleteSubproduct(subproduct){
      var index = this._.findIndex(this.service.subproducts, function(element){
        return (element.idSubproduct == subproduct.idSubproduct);
      });

      this.service.subproducts.splice(index, 1);
    }

    calculateSubproductTotal(subproduct){
      subproduct.total = subproduct.price * subproduct.quantity;
      this.calculateSubproductsTotal();
    }

    calculateSubproductsTotal(){
      var subproductsTotal = 0;
      this.service.subproducts.forEach(function(item){
        subproductsTotal += item.total;
      });
      this.service.subproductsPrice = subproductsTotal;
      this.calculatePrice()
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
