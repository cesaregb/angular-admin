'use strict';

describe('Component: SupplyComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SupplyComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SupplyComponent = $componentController('SupplyComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
