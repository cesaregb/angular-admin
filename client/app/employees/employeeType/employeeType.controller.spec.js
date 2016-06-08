'use strict';

describe('Component: EmployeeTypeComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var EmployeeTypeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EmployeeTypeComponent = $componentController('EmployeeTypeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
