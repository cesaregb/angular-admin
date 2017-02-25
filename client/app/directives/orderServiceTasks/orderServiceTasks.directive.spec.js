'use strict';

describe('Directive: orderServiceTasks', function () {

  // load the directive's module and view
  beforeEach(module('processAdminApp.orderServiceTasks'));
  beforeEach(module('app/directives/orderServiceTasks/orderServiceTasks.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<order-service-tasks></order-service-tasks>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the orderServiceTasks directive');
  }));
});
