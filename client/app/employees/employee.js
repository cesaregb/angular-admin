'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('employees', {
        cache: false,
        abstract: true,
        controller: 'EmployeeMainControllerCtrl',
        url: '/employees',
        template: '<ui-view/>'
      }).state('employees.employeeMenu', {
        url: '/employeeMenu',
        template: '<employee-menu></employee-menu>'
      }).state('employees.employeeType', {
        url: '/employeeType',
        template: '<employee-type></employee-type>',
        params: {
          employee: null
        }
      }).state('employees.employee', {
        url: '/employee',
        template: '<employee></employee>',
        params: {
          employee: null
        }
      });
  });
