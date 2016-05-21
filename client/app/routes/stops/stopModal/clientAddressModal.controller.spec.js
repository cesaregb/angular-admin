'use strict';

describe('Controller: ClientAddressModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.clientAddressModal'));

  var ClientAddressModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientAddressModalCtrl = $controller('ClientAddressModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
