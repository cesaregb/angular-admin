'use strict';

describe('Component: ClientPhoneComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var ClientPhoneComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ClientPhoneComponent = $componentController('ClientPhoneComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
