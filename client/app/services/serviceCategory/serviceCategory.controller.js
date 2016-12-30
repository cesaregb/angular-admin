'use strict';
(function() {

  class ServiceCategoryComponent {
    serviceCategories = [];

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
      this.factoryServices.getResources('serviceCategory').then(function(response) {
        _this.serviceCategories = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/services/serviceCategory/serviceCategoryModal/serviceCategoryModal.html',
        controller: 'ServiceCategoryModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var serviceCategory = resultItem;
        if (serviceCategory.idServiceCategory != null && serviceCategory.idServiceCategory > 0) {
          _this.factoryServices.updateResource('serviceCategory', serviceCategory).then(function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResource('serviceCategory', serviceCategory).then(function() {
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
        _this.factoryServices.deleteResource('serviceCategory', item.idServiceCategory).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('serviceCategory', {
      templateUrl: 'app/services/serviceCategory/serviceCategory.html',
      controller: ServiceCategoryComponent,
      controllerAs: '$cn'
    });

})();
