'use strict';

describe('Directive: taskDetails', function () {

  // load the directive's module and view
  beforeEach(module('processAdminApp.taskDetails'));
  beforeEach(module('app/directives/taskDetails/taskDetails.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<task-details></task-details>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the taskDetails directive');
  }));
});
