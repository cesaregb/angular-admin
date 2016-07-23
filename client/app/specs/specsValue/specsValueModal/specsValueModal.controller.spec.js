'use strict';

describe('Controller: SpecsValueModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.specsValueModal'));

  var SpecsValueModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecsValueModalCtrl = $controller('SpecsValueModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
