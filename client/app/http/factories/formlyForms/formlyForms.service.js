'use strict';

angular.module('processAdminApp')
  .factory('formlyForms', function () {
    var factory = {};

    factory.serviceType = [
      {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        required: true
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Description',
        required: true
      }
    }, {
      key: 'price',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Price',
        required: true
      }
    }, {
      key: 'time',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Time',
        required: true
      }
    }];

    factory.orderType = [
      {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        required: true
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Description',
        required: true
      }
    }];


    return factory;
  });
