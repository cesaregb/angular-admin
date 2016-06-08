'use strict';

describe('Component: ProductTypeComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ProductTypeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ProductTypeComponent = $componentController('ProductTypeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
