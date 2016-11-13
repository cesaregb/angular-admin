'use strict';

describe('Controller: ProductAddressModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.productAddressModal'));

  var ProductAddressModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductAddressModalCtrl = $controller('ProductAddressModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
