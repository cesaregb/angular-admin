'use strict';

describe('Controller: SpecMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.SpecMainController'));

  var SpecMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecMainControllerCtrl = $controller('SpecMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
