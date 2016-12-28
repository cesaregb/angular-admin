'use strict';
(function() {

  class SpecComponent {
    specs = [];

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
      this.factoryServices.getResources('specs').then(function(response) {
        _this.specs = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/specs/spec/specModal/specModal.html',
        controller: 'SpecModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var spec = resultItem;
        if (spec.idSpecs != null && spec.idSpecs > 0) {
          _this.factoryServices.updateResource('specs', spec).then(()=>{
            _this.getInfo();
          });
        } else {
          _this.factoryServices.saveResource('specs', spec).then(()=>{
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
        _this.factoryServices.deleteResource('specs', item.idSpecs).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('spec', {
      templateUrl: 'app/specs/spec/spec.html',
      controller: SpecComponent,
      controllerAs: '$cn'
    });

})();
