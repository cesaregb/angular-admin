'use strict';

describe('Service: factoryUtils', function () {

  // load the service's module
  beforeEach(module('processAdminApp.factoryUtils'));

  // instantiate service
  var factoryUtils;
  beforeEach(inject(function (_factoryUtils_) {
    factoryUtils = _factoryUtils_;
  }));

  it('should do something', function () {
    expect(!!factoryUtils).toBe(true);
  });

});
