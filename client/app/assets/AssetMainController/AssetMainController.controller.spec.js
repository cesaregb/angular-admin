'use strict';

describe('Controller: AssetMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.AssetMainController'));

  var AssetMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssetMainControllerCtrl = $controller('AssetMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
