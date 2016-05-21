'use strict';

describe('Component: CalendarRouteComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var CalendarRouteComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CalendarRouteComponent = $componentController('CalendarRouteComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
