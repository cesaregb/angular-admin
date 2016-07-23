'use strict';

describe('Component: OrderTypeFormComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var OrderTypeFormComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OrderTypeFormComponent = $componentController('OrderTypeFormComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
