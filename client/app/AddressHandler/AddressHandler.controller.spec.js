'use strict';

describe('Controller: AddressHandlerCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.AddressHandler'));

  var AddressHandlerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddressHandlerCtrl = $controller('AddressHandlerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
