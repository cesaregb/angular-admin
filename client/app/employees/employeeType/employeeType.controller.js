'use strict';
(function() {

  class EmployeeTypeComponent {
    employeeTypes = [];

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
      let _this = this;
      this.factoryServices.getResources('employeeType').then(function(response) {
        _this.employeeTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      let _this = this;
      let modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/employees/employeeType/employeeTypeModal/employeeTypeModal.html',
        controller: 'EmployeeTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var employeeType = resultItem;
        if (employeeType.idEmployeeType != null && employeeType.idEmployeeType > 0) {
          _this.factoryServices.updateResource('employeeType',employeeType).then(()=>{
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResource('employeeType', employeeType).then(()=>{
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
        _this.factoryServices.deleteResource('employeeType', item.idEmployeeType).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('employeeType', {
      templateUrl: 'app/employees/employeeType/employeeType.html',
      controller: EmployeeTypeComponent,
      controllerAs: '$cn'
    });

})();
