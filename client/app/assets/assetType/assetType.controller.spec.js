'use strict';

describe('Component: AssetTypeComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var AssetTypeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AssetTypeComponent = $componentController('AssetTypeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
