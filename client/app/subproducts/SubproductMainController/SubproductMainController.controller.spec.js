'use strict';

describe('Controller: SubproductMainControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.SubproductMainController'));

  var SubproductMainControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubproductMainControllerCtrl = $controller('SubproductMainControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
