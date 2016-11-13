'use strict';

describe('Controller: SupplyModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.supplyModal'));

  var SupplyModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupplyModalCtrl = $controller('SupplyModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
