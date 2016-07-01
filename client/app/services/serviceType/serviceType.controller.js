'use strict';
(function() {

  class ServiceTypeComponent {
    serviceTypes = [];

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
      this.factoryServices.getResources('serviceType').then(function(response) {
        _this.serviceTypes = response;

      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/services/serviceType/serviceTypeModal/serviceTypeModal.html',
        controller: 'ServiceTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var serviceType = resultItem;
        if (serviceType.idServiceType != null && serviceType.idServiceType > 0) {
          _this.factoryServices.updateResourceCallback('serviceType', serviceType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResourceCallback('serviceType', serviceType, function() {
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
        _this.factoryServices.deleteResource('serviceType', item.idServiceType).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('serviceType', {
      templateUrl: 'app/services/serviceType/serviceType.html',
      controller: ServiceTypeComponent,
      controllerAs: '$cn'
    });

})();
