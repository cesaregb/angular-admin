'use strict';

describe('Component: RoutesComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var RoutesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RoutesComponent = $componentController('RoutesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
