'use strict';

describe('Service: factoryRoutes', function () {

  // load the service's module
  beforeEach(module('processAdminApp.factoryRoutes'));

  // instantiate service
  var factoryRoutes;
  beforeEach(inject(function (_factoryRoutes_) {
    factoryRoutes = _factoryRoutes_;
  }));

  it('should do something', function () {
    expect(!!factoryRoutes).toBe(true);
  });

});
