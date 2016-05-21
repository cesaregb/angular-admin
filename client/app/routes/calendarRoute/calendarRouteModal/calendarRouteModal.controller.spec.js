'use strict';

describe('Controller: RoutePaymentInfoModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.routePhoneModal'));

  var RoutePaymentInfoModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoutePaymentInfoModalCtrl = $controller('RoutePaymentInfoModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
