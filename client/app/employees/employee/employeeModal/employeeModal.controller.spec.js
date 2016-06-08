'use strict';

describe('Controller: EmployeeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.employeeModal'));

  var EmployeeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeeModalCtrl = $controller('EmployeeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
