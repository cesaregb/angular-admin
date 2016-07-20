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

    openManageSpecsModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/services/serviceType/manageSpecsModal/manageSpecsModal.html',
        controller: 'ManageSpecsModalCtrl',
        size: 'lg',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var serviceType = resultItem;
        if (serviceType.serviceTypeSpecs.length > 0){
          serviceType.serviceTypeSpecs.forEach(function(serviceTypeSpec){
            _this.factoryServices.saveResource('serviceTypeSpec', serviceTypeSpec).then(function(response){
              $log.info('[save] serviceTypeSpec: ' + JSON.stringify(serviceTypeSpec, null, 2));
            })
          });
        }
        // all the info should be saved.
      });
    }

    openManageSpecsModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/services/serviceType/manageTasksModal/manageTasksModal.html',
        controller: 'ManageTasksModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var serviceType = resultItem;
        if (serviceType.serviceTypeTasks.length > 0){
          serviceType.serviceTypeTasks.forEach(function(serviceTypeTask){
            _this.factoryServices.saveResource('serviceTypeTask', serviceTypeTask).then(function(response){
              $log.info('[save] serviceTypeTask: ' + JSON.stringify(serviceTypeTask, null, 2));
            })
          });
        }
        // all the info should be saved.
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
