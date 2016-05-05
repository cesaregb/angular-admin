'use strict';

describe('Service: serviceClients', function () {

  // load the service's module
  beforeEach(module('processAdminApp.serviceClients'));

  // instantiate service
  var serviceClients;
  beforeEach(inject(function (_serviceClients_) {
    serviceClients = _serviceClients_;
  }));

  it('should do something', function () {
    expect(!!serviceClients).toBe(true);
  });

});
