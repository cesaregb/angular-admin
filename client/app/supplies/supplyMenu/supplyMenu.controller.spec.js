'use strict';

describe('Component: SupplyMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SupplyMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SupplyMenuComponent = $componentController('SupplyMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
