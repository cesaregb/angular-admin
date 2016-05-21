'use strict';

describe('Service: factoryCommon', function () {

  // load the service's module
  beforeEach(module('processAdminApp.factoryCommon'));

  // instantiate service
  var factoryCommon;
  beforeEach(inject(function (_factoryCommon_) {
    factoryCommon = _factoryCommon_;
  }));

  it('should do something', function () {
    expect(!!factoryCommon).toBe(true);
  });

});
