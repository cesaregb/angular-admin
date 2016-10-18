'use strict';

describe('Controller: ManageProductTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageProductTypeModal'));

  var ManageProductTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageProductTypeModalCtrl = $controller('ManageProductTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
