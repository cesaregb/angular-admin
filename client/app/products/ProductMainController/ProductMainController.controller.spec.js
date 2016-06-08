'use strict';

describe('Controller: ProductMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.ProductMainController'));

  var ProductMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductMainControllerCtrl = $controller('ProductMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
