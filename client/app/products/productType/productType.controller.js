'use strict';
(function() {

  class ProductTypeComponent {
    productTypes = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryServices.getResources('productType').then(function(response) {
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
          _this.factoryServices.updateResource('productType', productType).then(function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResource('productType', productType).then(function() {
            _this.getInfo();
          });
        }
      });
    }

    delete(item){
      var _this = this;
      this.$confirm({
        text: 'Estas seguro de borrar el registro??'
      })
      .then(function() {
        _this.factoryServices.deleteResource('productType', item.idProductType).then(function(){
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
