'use strict';

describe('Controller: TaskTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.taskTypeModal'));

  var TaskTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskTypeModalCtrl = $controller('TaskTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
