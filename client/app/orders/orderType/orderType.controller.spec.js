'use strict';

describe('Component: TaskComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var TaskComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TaskComponent = $componentController('TaskComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
