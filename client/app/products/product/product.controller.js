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
      this.tableParams = new this.NgTableParams({}, {
        getData: (params)=>{
          return this.factoryServices.getResourcesForTable('products', params);
        }
      });

    }

    createFilter() {
      let deferred = this.$q.defer();
      let filter = [];
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

      modalInstance.result.then((resultItem)=>{
        const product = resultItem;
        this.$log.info('[openModal Result] product: ' + JSON.stringify(product, null, 2));
        if (product.idProduct !== null && product.idProduct > 0) {
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
      let _this = this;
      this.$confirm({
        text: 'Estas seguro de borrar el registro??'
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
