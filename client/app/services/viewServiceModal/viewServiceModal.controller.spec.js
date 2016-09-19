'use strict';

describe('Controller: ViewServiceModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.manageSpecsModal'));

  var ViewServiceModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewServiceModalCtrl = $controller('ViewServiceModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
