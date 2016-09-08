'use strict';

describe('Component: SubproductTypeComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SubproductTypeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SubproductTypeComponent = $componentController('SubproductTypeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
