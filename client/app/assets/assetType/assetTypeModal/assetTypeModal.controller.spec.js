'use strict';

describe('Controller: AssetTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.assetTypeModal'));

  var AssetTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssetTypeModalCtrl = $controller('AssetTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
