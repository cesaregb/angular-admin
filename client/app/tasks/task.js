'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('tasks', {
        cache: false,
        abstract: true,
        controller: 'TaskMainControllerCtrl',
        url: '/tasks',
        template: '<ui-view/>'
      }).state('tasks.taskMenu', {
        url: '/taskMenu',
        authenticate: true,
        template: '<task-menu></task-menu>'
      }).state('tasks.taskType', {
        url: '/taskType',
        template: '<task-type></task-type>',
        params: {
          task: null
        }
      }).state('tasks.task', {
        url: '/task',
        template: '<task></task>',
        params: {
          task: null
        }
      });
  });
