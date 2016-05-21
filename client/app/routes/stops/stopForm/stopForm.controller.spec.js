'use strict';

describe('Component: StopFormComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var StopFormComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StopFormComponent = $componentController('StopFormComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
