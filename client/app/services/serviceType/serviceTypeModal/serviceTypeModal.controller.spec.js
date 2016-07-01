'use strict';

describe('Controller: TaskModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.serviceTypeModal'));

  var TaskModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskModalCtrl = $controller('TaskModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
