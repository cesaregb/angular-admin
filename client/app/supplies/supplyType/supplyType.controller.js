'use strict';
(function() {

  class SupplyTypeComponent {
    supplyTypes = [];

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
      this.factoryServices.getSupplyTypes().then(function(response) {
        _this.supplyTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/supplies/supplyType/supplyTypeModal/supplyTypeModal.html',
        controller: 'SupplyTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var supplyType = resultItem;
        if (supplyType.idSupplyType != null && supplyType.idSupplyType > 0) {
          _this.factoryServices.updateSupplyTypeCallback(supplyType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveSupplyTypeCallback(supplyType, function() {
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
        _this.factoryServices.deleteSupplyType(item).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('supplyType', {
      templateUrl: 'app/supplies/supplyType/supplyType.html',
      controller: SupplyTypeComponent,
      controllerAs: '$cn'
    });

})();
