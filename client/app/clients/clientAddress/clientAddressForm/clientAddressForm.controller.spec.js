'use strict';

describe('Component: ClientAddressFormComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ClientAddressFormComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ClientAddressFormComponent = $componentController('ClientAddressFormComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
