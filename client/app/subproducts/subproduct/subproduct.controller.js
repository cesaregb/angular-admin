'use strict';
(function() {

  class SubproductComponent {
    subproducts = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams) {
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
          return _this.factoryServices.getResourcesForTable('subproduct', params);
        }
      });

    }

    getInfo() {
      this.tableParams.reload();
      // var _this = this;
      // this.factoryServices.getResources('subproduct').then(function(response) {
      //   _this.subproducts = response;
      // });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/subproducts/subproduct/subproductModal/subproductModal.html',
        controller: 'SubproductModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var subproduct = resultItem;
        if (subproduct.idSubproduct != null && subproduct.idSubproduct > 0) {
          _this.factoryServices.updateResource('subproduct', subproduct).then(function() {
            _this.getInfo();
          });
        } else {
          _this.factoryServices.saveResource('subproduct', subproduct).then(function() {
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
        _this.factoryServices.deleteResource('subproduct', item.idSubproduct).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('subproduct', {
      templateUrl: 'app/subproducts/subproduct/subproduct.html',
      controller: SubproductComponent,
      controllerAs: '$cn'
    });

})();
