'use strict';

describe('Component: FormOrderComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var FormOrderComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    FormOrderComponent = $componentController('FormOrderComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
