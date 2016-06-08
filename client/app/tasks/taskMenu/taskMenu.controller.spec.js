'use strict';

describe('Component: TaskMenuComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var TaskMenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TaskMenuComponent = $componentController('TaskMenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
