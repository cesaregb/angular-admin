'use strict';

describe('Controller: ManageSubproductTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageSubproductTypeModal'));

  var ManageSubproductTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageSubproductTypeModalCtrl = $controller('ManageSubproductTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
