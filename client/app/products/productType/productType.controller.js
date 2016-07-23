'use strict';
(function() {

  class ProductTypeComponent {
    productTypes = [];

    constructor($stateParams, $state, noty, factoryGeneral, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryGeneral = factoryGeneral;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryGeneral.getProductTypes().then(function(response) {
        _this.productTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/products/productType/productTypeModal/productTypeModal.html',
        controller: 'ProductTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var productType = resultItem;
        if (productType.idProductType != null && productType.idProductType > 0) {
          _this.factoryGeneral.updateProductTypeCallback(productType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveProductTypeCallback(productType, function() {
            _this.getInfo();
          });
        }
      });
    }

    delete(item){
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryGeneral.deleteProductType(item).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('productType', {
      templateUrl: 'app/products/productType/productType.html',
      controller: ProductTypeComponent,
      controllerAs: '$cn'
    });

})();
