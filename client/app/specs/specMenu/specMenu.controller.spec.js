'use strict';

describe('Component: SpecMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SpecMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SpecMenuComponent = $componentController('SpecMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
