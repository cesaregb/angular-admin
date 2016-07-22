'use strict';

describe('Service: formlyForms', function () {

  // load the service's module
  beforeEach(module('processAdminApp.formlyForms'));

  // instantiate service
  var formlyForms;
  beforeEach(inject(function (_formlyForms_) {
    formlyForms = _formlyForms_;
  }));

  it('should do something', function () {
    expect(!!formlyForms).toBe(true);
  });

});
