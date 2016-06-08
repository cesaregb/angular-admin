'use strict';

describe('Component: EmployeeMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var EmployeeMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EmployeeMenuComponent = $componentController('EmployeeMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
