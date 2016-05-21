'use strict';

describe('Component: RoutesAllComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var RoutesAllComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RoutesAllComponent = $componentController('RoutesAllComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
