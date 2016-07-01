'use strict';

describe('Service: AddressHandler', function () {

  // load the service's module
  beforeEach(module('processAdminApp.AddressHandler'));

  // instantiate service
  var AddressHandler;
  beforeEach(inject(function (_AddressHandler_) {
    AddressHandler = _AddressHandler_;
  }));

  it('should do something', function () {
    expect(!!AddressHandler).toBe(true);
  });

});
