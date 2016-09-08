'use strict';

describe('Controller: SubproductTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.subproductTypeModal'));

  var SubproductTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubproductTypeModalCtrl = $controller('SubproductTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
