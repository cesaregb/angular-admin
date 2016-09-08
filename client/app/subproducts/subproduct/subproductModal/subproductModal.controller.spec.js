'use strict';

describe('Controller: SubproductModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.subproductModal'));

  var SubproductModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubproductModalCtrl = $controller('SubproductModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
