'use strict';

describe('Component: SubproductMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SubproductMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SubproductMenuComponent = $componentController('SubproductMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
