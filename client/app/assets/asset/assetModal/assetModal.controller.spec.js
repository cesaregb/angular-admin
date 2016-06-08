'use strict';

describe('Controller: AssetModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.assetModal'));

  var AssetModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssetModalCtrl = $controller('AssetModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
