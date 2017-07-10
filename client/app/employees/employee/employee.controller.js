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
      let _this = this;
      this.factoryServices.getResources('employees').then((response)=>{
        _this.employees = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      let _this = this;
      let modalInstance = this.$uibModal.open({
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
        let employee = resultItem;
        if (employee.idEmployee != null && employee.idEmployee > 0) {
          _this.factoryServices.updateResource('employees', employee).then(()=>{
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResource('employees', employee).then(()=>{
            _this.getInfo();
          });
        }
      });
    }

    delete(item){
      let _this = this;
      this.$confirm({
        text: 'Estas seguro de borrar el registro??'
      })
      .then(function() {
        _this.factoryServices.deleteResource('employees', item.idEmployee).then(function(info){
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
