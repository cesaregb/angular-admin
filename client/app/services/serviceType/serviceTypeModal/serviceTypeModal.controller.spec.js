'use strict';

describe('Controller: ServiceTypeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.serviceTypeModal'));

  var ServiceTypeModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceTypeModalCtrl = $controller('ServiceTypeModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
