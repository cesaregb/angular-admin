'use strict';

describe('Service: googleMapsDirections', function () {

  // load the service's module
  beforeEach(module('processAdminApp'));

  // instantiate service
  var googleMapsDirections;
  beforeEach(inject(function (_googleMapsDirections_) {
    googleMapsDirections = _googleMapsDirections_;
  }));

  it('should do something', function () {
    expect(!!googleMapsDirections).toBe(true);
  });

});
