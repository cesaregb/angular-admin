'use strict';

describe('Controller: SubproductAddressModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.subproductAddressModal'));

  var SubproductAddressModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubproductAddressModalCtrl = $controller('SubproductAddressModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
