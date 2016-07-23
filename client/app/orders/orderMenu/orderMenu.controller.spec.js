'use strict';

describe('Component: OrderMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var OrderMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OrderMenuComponent = $componentController('OrderMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
