'use strict';

describe('Component: RouteCalendarComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var RouteCalendarComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RouteCalendarComponent = $componentController('RouteCalendarComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
