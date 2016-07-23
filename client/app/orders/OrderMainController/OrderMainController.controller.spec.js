'use strict';

describe('Controller: OrderMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.OrderMainController'));

  var OrderMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderMainControllerCtrl = $controller('OrderMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
