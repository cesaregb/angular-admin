'use strict';

describe('Service: factoryServices', function () {

  // load the service's module
  beforeEach(module('processAdminApp.factoryServices'));

  // instantiate service
  var factoryServices;
  beforeEach(inject(function (_factoryServices_) {
    factoryServices = _factoryServices_;
  }));

  it('should do something', function () {
    expect(!!factoryServices).toBe(true);
  });

});
