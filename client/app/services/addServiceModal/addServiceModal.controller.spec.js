'use strict';

describe('Controller: AddServicesModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.addServicesModalCtrl'));

  var AddServicesModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddServicesModalCtrl = $controller('AddServicesModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
