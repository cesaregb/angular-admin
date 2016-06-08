'use strict';

describe('Component: ProductMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ProductMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ProductMenuComponent = $componentController('ProductMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
