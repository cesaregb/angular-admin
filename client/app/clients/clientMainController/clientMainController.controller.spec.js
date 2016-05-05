'use strict';

describe('Controller: ClientMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.clientMainController'));

  var ClientMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientMainControllerCtrl = $controller('ClientMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
