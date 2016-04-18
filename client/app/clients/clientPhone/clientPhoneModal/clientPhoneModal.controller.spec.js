'use strict';

describe('Controller: ClientPhoneModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.clientPhoneModal'));

  var ClientPhoneModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientPhoneModalCtrl = $controller('ClientPhoneModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
