'use strict';

describe('Controller: ManageSpecsModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageSpecsModal'));

  var ManageSpecsModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageSpecsModalCtrl = $controller('ManageSpecsModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
