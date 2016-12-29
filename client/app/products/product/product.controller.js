'use strict';
(function() {

  class ProductComponent {
    products = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams, $q) {
      this.$q = $q;
      this.$log = $log;
      this.NgTableParams = NgTableParams;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      var _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function(params) {
          return _this.factoryServices.getResourcesForTable('products', params);
        }
      });

    }

    createFilter() {
      var deferred = this.$q.defer();
      var filter = [];
      this.factoryServices.getResources('productType').then(function(response) {
        response.forEach(function(item){
          filter.push({title: item.name, id:item.name});
        });
        deferred.resolve(filter);
      });
      return deferred.promise;
    }

    getInfo() {
      this.tableParams.reload();
      // var _this = this;
      // this.factoryServices.getResources('product').then(function(response) {
      //   _this.products = response;
      // });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/products/product/productModal/productModal.html',
        controller: 'ProductModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var product = resultItem;
        if (product.idProduct != null && product.idProduct > 0) {
          _this.factoryServices.updateResource('products', product).then(function() {
            _this.getInfo();
          });
        } else {
          _this.factoryServices.saveResource('products', product).then(function() {
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
        _this.factoryServices.deleteResource('products', item.idProduct).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('product', {
      templateUrl: 'app/products/product/product.html',
      controller: ProductComponent,
      controllerAs: '$cn'
    });

})();
