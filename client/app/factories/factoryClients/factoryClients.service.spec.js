'use strict';

describe('Service: factoryClients', function () {

  // load the service's module
  beforeEach(module('processAdminApp.factoryClients'));

  // instantiate service
  var factoryClients;
  beforeEach(inject(function (_factoryClients_) {
    factoryClients = _factoryClients_;
  }));

  it('should do something', function () {
    expect(!!factoryClients).toBe(true);
  });

});
