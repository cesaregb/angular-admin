'use strict';
(function() {

  class EmployeeTypeComponent {
    employeeTypes = [];

    constructor($stateParams, $state, noty, factoryGeneral, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryGeneral = factoryGeneral;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryGeneral.getEmployeeTypes().then(function(response) {
        _this.employeeTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
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
          _this.factoryGeneral.updateEmployeeTypeCallback(employeeType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveEmployeeTypeCallback(employeeType, function() {
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
        _this.factoryGeneral.deleteEmployeeType(item).then(function(info){
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
