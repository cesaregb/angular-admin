'use strict';

describe('Controller: EmployeeTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.employeeTypeModal'));

  var EmployeeTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeeTypeModalCtrl = $controller('EmployeeTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
