'use strict';

describe('Controller: SupplyTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.supplyTypeModal'));

  var SupplyTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupplyTypeModalCtrl = $controller('SupplyTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
