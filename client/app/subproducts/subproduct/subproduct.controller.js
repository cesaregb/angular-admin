'use strict';
(function() {

  class SubproductComponent {
    subproducts = [];

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
      this.factoryGeneral.getSubproducts().then(function(response) {
        _this.subproducts = response;

      });
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
          _this.factoryGeneral.updateSubproductCallback(subproduct, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveSubproductCallback(subproduct, function() {
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
        _this.factoryGeneral.deleteSubproduct(item).then(function(info){
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
