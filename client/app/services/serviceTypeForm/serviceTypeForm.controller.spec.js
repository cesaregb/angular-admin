'use strict';

describe('Component: ServiceTypeFormComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ServiceTypeFormComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ServiceTypeFormComponent = $componentController('ServiceTypeFormComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
