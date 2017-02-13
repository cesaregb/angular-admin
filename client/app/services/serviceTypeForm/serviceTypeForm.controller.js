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
          controller: function ($scope, factoryServices) {
            $scope.to.loading = factoryServices.getResources('serviceCategory').then((response) => {
              let holder = [];
              response.forEach((item) => {
                holder.push({name: item.name, value: item.idServiceCategory});
              });
              $scope.to.options = holder;
            });
          }
        });
      }
    };

    fillCategories() {
      var deferred = this.$q.defer();
      var _this = this;
      this.factoryServices.getResources('serviceCategory').then((response) => {

        response.forEach((item) => {
          _this.parentSelect.push({name: item.name, value: item.idServiceCategory});
        });

        if (!Boolean(_this.serviceType.idServiceCategory)) {
          _this.serviceType.idServiceCategory = 1;
        }
        deferred.resolve(_this.parentSelect);
      });
      return deferred.promise;
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
          _this.$log.info('[openManageSpecsModal] serviceType.specs: ' + serviceType.specs.length);
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
          serviceType.serviceTypeTasks.forEach(function (serviceTypeTask) {
            _this.factoryServices.saveResource('serviceTypeTask', serviceTypeTask).then(function (response) {
              // do nothing..
            })
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
