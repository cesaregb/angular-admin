'use strict';

describe('Component: NewOrderComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var NewOrderComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NewOrderComponent = $componentController('NewOrderComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
