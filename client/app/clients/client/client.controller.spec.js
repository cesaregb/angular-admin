'use strict';

describe('Component: ClientComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ClientComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ClientComponent = $componentController('ClientComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
