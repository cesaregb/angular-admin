'use strict';

describe('Controller: ServiceCategoryModalCtrl', function () {

  // load the controller's module
  beforeEach(module('processAdminApp.serviceCategoryModal'));

  var ServiceCategoryModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceCategoryModalCtrl = $controller('ServiceCategoryModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
