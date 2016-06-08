'use strict';
(function(){

class EmployeeMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('employeeMenu', {
    templateUrl: 'app/employees/employeeMenu/employeeMenu.html',
    controller: EmployeeMenuComponent,
    controllerAs: '$cn'
  });

})();
