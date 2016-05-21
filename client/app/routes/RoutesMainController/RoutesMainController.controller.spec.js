'use strict';

describe('Controller: RoutesMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.RoutesMainController'));

  var RoutesMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoutesMainControllerCtrl = $controller('RoutesMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
