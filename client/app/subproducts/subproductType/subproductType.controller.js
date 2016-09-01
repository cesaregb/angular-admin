'use strict';
(function() {

  class SubproductTypeComponent {
    subproductTypes = [];

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
      this.factoryGeneral.getSubproductTypes().then(function(response) {
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
          _this.factoryGeneral.updateSubproductTypeCallback(subproductType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveSubproductTypeCallback(subproductType, function() {
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
        _this.factoryGeneral.deleteSubproductType(item).then(function(info){
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
