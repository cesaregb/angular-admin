'use strict';

describe('Controller: ManageTasksModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageTasksModal'));

  var ManageTasksModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageTasksModalCtrl = $controller('ManageTasksModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
