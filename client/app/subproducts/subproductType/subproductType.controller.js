'use strict';
(function() {

  class SubproductTypeComponent {
    subproductTypes = [];

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
      this.factoryServices.getResources('subproductType').then(function(response) {
        _this.subproductTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/subproducts/subproductType/subproductTypeModal/subproductTypeModal.html',
        controller: 'SubproductTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var subproductType = resultItem;
        if (subproductType.idSubproductType != null && subproductType.idSubproductType > 0) {
          _this.factoryServices.updateResource('subproductType', subproductType).then(function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResource('subproductType', subproductType).then(function() {
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
        _this.factoryServices.deleteResource('subproductType', item.idSubproductType).then(function(){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('subproductType', {
      templateUrl: 'app/subproducts/subproductType/subproductType.html',
      controller: SubproductTypeComponent,
      controllerAs: '$cn'
    });

})();
