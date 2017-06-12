'use strict';

describe('Component: CashOutComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var CashOutComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CashOutComponent = $componentController('CashOutComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
