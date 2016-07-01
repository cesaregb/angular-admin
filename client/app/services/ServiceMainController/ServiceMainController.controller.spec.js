'use strict';

describe('Controller: ServiceMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.ServiceMainController'));

  var ServiceMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceMainControllerCtrl = $controller('ServiceMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
