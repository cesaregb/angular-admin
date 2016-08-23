'use strict';

describe('Controller: ManageOrderServiceTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageOrderServiceTypeModal'));

  var ManageOrderServiceTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageOrderServiceTypeModalCtrl = $controller('ManageOrderServiceTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
