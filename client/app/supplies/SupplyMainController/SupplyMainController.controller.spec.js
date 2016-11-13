'use strict';

describe('Controller: SupplyMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.SupplyMainController'));

  var SupplyMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupplyMainControllerCtrl = $controller('SupplyMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
