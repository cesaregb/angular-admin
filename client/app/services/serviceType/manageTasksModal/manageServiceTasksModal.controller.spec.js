'use strict';

describe('Controller: ManageServiceTasksModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageServiceTasksModal'));

  var ManageServiceTasksModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageServiceTasksModalCtrl = $controller('ManageServiceTasksModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
