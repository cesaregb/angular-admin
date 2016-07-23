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
      this.factoryServices.getResources('spec').then(function(response) {
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
          _this.factoryServices.updateResourceCallback('spec', spec, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResourceCallback('spec', spec, function() {
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
        _this.factoryServices.deleteResource('spec', item.idSpecs).then(function(info){
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
