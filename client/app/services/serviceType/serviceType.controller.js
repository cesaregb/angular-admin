'use strict';
(function() {

  class ServiceTypeComponent {
    serviceTypes = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams) {
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      // this.getInfo();
      var _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function(params) {
          return _this.factoryServices.getResourcesForTable('serviceType', params);
        }
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openServiceTypeForm(serviceType){
      this.serviceType = serviceType;
      this.$state.go('services.serviceTypeForm', {serviceType: serviceType}, { reload: true });
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
