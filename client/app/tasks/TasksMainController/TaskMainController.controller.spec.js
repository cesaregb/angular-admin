'use strict';

describe('Controller: TaskMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.TaskMainController'));

  var TaskMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskMainControllerCtrl = $controller('TaskMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
