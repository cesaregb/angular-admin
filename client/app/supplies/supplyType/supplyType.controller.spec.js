'use strict';

describe('Component: SupplyTypeComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SupplyTypeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SupplyTypeComponent = $componentController('SupplyTypeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
