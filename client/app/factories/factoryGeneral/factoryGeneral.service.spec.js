'use strict';

describe('Service: factoryGeneral', function () {

  // load the service's module
  beforeEach(module('processAdminApp.factoryGeneral'));

  // instantiate service
  var factoryGeneral;
  beforeEach(inject(function (_factoryGeneral_) {
    factoryGeneral = _factoryGeneral_;
  }));

  it('should do something', function () {
    expect(!!factoryGeneral).toBe(true);
  });

});
