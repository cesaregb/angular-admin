'use strict';

describe('Component: OrdersListComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var OrdersListComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    OrdersListComponent = $componentController('ordersList', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
