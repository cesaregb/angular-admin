'use strict';

describe('Component: ServiceCategoryComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ServiceCategoryComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ServiceCategoryComponent = $componentController('ServiceCategoryComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
