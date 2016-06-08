'use strict';

describe('Controller: ProductModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.productModal'));

  var ProductModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductModalCtrl = $controller('ProductModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
