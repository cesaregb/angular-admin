'use strict';
(function() {

  class EmployeeComponent {
    employees = [];

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
      this.factoryServices.getEmployees().then(function(response) {
        _this.employees = response;

      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/employees/employee/employeeModal/employeeModal.html',
        controller: 'EmployeeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var employee = resultItem;
        if (employee.idEmployee != null && employee.idEmployee > 0) {
          _this.factoryServices.updateEmployeeCallback(employee, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveEmployeeCallback(employee, function() {
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
        _this.factoryServices.deleteEmployee(item).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('employee', {
      templateUrl: 'app/employees/employee/employee.html',
      controller: EmployeeComponent,
      controllerAs: '$cn'
    });

})();
