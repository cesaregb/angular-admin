'use strict';

describe('Component: ClientPaymentInfoComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ClientPaymentInfoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ClientPaymentInfoComponent = $componentController('ClientPaymentInfoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
