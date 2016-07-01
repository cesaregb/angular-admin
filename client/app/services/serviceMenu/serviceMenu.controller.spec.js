'use strict';

describe('Component: ServiceMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ServiceMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ServiceMenuComponent = $componentController('ServiceMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
