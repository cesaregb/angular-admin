'use strict';

describe('Component: SpecsValueComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SpecsValueComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SpecsValueComponent = $componentController('SpecsValueComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
