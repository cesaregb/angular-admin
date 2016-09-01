'use strict';

describe('Component: SubproductComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SubproductComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SubproductComponent = $componentController('SubproductComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
