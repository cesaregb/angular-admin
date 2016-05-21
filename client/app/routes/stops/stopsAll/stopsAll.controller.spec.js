'use strict';

describe('Component: StopAllComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var StopAllComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StopAllComponent = $componentController('StopAllComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
