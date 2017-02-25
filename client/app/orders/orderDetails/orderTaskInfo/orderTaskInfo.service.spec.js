'use strict';

describe('Service: orderTaskInfo', function () {

  // load the service's module
  beforeEach(module('processAdminApp.orderTaskInfo'));

  // instantiate service
  var orderTaskInfo;
  beforeEach(inject(function (_orderTaskInfo_) {
    orderTaskInfo = _orderTaskInfo_;
  }));

  it('should do something', function () {
    expect(!!orderTaskInfo).toBe(true);
  });

});
