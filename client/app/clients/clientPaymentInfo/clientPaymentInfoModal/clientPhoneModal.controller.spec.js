'use strict';

describe('Controller: ClientPaymentInfoModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.clientPhoneModal'));

  var ClientPaymentInfoModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientPaymentInfoModalCtrl = $controller('ClientPaymentInfoModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
