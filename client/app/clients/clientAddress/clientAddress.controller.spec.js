'use strict';

describe('Component: ClientAddressComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ClientAddressComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ClientAddressComponent = $componentController('ClientAddressComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
