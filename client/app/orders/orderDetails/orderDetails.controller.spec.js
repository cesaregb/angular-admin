'use strict';

describe('Component: OrderDetailsComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var OrderDetailsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OrderDetailsComponent = $componentController('OrderDetailsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
