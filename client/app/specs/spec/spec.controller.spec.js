'use strict';

describe('Component: SpecComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SpecComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SpecComponent = $componentController('SpecComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
