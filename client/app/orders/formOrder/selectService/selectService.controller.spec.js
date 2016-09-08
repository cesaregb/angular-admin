'use strict';

describe('Component: SelectServiceComponent', function () {

  // load the controller's module
  beforeEach(module('processAdminApp'));

  var SelectServiceComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SelectServiceComponent = $componentController('selectService', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
