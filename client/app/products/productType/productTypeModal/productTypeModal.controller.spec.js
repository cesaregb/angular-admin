'use strict';

describe('Controller: ProductTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.productTypeModal'));

  var ProductTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductTypeModalCtrl = $controller('ProductTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
