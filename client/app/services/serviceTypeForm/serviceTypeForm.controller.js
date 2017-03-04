'use strict';
(function () {

  class ServiceTypeFormComponent {
    parentSelect = [];
    formItemFields = [];
    serviceType = {};
    title = "New Service Type";

    constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, formlyForms, _, $q) {
      var t = this;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.place = null;
      this.$q = $q;
      this.serviceType = $stateParams.serviceType;
      this.editMode = (Boolean(this.serviceType) && Boolean(this.serviceType.idServiceType));

      // assign form
      this.formItemFields = formlyForms.serviceType;

      this.init();

      let field = _.find(t.formItemFields, function (search) {
        return (search.key === 'idServiceCategory');
      });

      if (!Boolean(field)) {
        t.formItemFields.push({
          key: 'idServiceCategory',
          type: 'select',
          templateOptions: {
            label: 'Service Category',
            options: []
          },
          controller: 'ServiceCategoryDD'
        });
      }
    };

    init() {
      this.editMode = (Boolean(this.serviceType) && Boolean(this.serviceType.idServiceType));
      if (Boolean(this.editMode)) {
        this.title = "Edit Service Type";
      }
    }

    saveServiceType() {
      var _this = this;
      if (this.serviceType.idServiceType != null && this.serviceType.idServiceType > 0) {
        _this.factoryServices.updateResource('serviceType', this.serviceType).then(function (result) {
          _this.serviceType = result;
          _this.init();
        });
      } else {
        _this.factoryServices.saveResource('serviceType', this.serviceType).then(function (result) {
          _this.serviceType = result;
          _this.init();
        });
      }
    };

    delete() {
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
        .then(function () {
          _this.factoryServices.deleteResource('serviceType', _this.serviceType.idServiceType).then(function (info) {
            _this.back();
          });
        });
    };

    back() {
      this.$state.go('services.serviceType', null, {
        reload: true
      });
    }

    openManageSpecsModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/specs/manageSpecsModal/manageSpecsModal.html',
        controller: 'ManageSpecsModalCtrl',
        size: 'lg',
        resolve: {
          formItem: function () {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function (resultItem) {
        let serviceType = resultItem;
        if (serviceType.specs.length > 0) {
          _this.factoryServices.addServiceTypeSpecs(serviceType.idServiceType, serviceType.specs).then(function (result) {
            _this.serviceType = result;
          });
        }
      });
    }

    openManageTaskModal(formItem) {
      let _this = this;
      let modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/tasks/manageTasksModal/manageTasksModal.html',
        controller: 'ManageOrderTasksModalCtrl',
        size: 'lg',
        resolve: {
          formItem: function () {
            return formItem;
          },
          requester: function () {
            return 1;
          }
        }
      });

      modalInstance.result.then(function (resultItem) {
        let serviceType = resultItem;
        if (serviceType.serviceTypeTasks.length > 0) {
          _this.factoryServices.addServiceTypeTasks(serviceType.idServiceType, serviceType.serviceTypeTasks).then(function (result) {
            _this.serviceType = result;
          });
        }

      });
    }

    openManageProductTypes(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/products/manageProductTypeModal/manageProductTypeModal.html',
        controller: 'ManageProductTypeModalCtrl',
        size: 'lg',
        resolve: {
          formItem: function () {
            return formItem;
          },
          requester: function () {
            return 1;
          }
        }
      });

      modalInstance.result.then(function (resultItem) {
        var serviceType = resultItem;
        if (serviceType.productTypes.length > 0) {
          _this.factoryServices.addServiceTypeProducts(serviceType.idServiceType, serviceType.productTypes).then(function (result) {
            _this.serviceType = result;
          });

        }
      });
    }

    // end class
  }

  angular.module('processAdminApp')
    .component('serviceTypeForm', {
      templateUrl: 'app/services/serviceTypeForm/serviceTypeForm.html',
      controller: ServiceTypeFormComponent,
      controllerAs: '$cn'
    });

})();
