'use strict';

describe('Controller: EmployeeMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.EmployeeMainController'));

  var EmployeeMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeeMainControllerCtrl = $controller('EmployeeMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
