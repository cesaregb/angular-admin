'use strict';

angular.module('processAdminApp')
  .factory('formlyForms', function() {
    var factory = {};

    factory.serviceType = [{
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
        label: 'Descipcion',
        required: false
      }
    }, {
      key: 'price',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Precio',
        required: true
      }
    }, {
      key: 'time',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Tiempo aproximado minutos',
        required: true
      }
    }, {
      key: 'calculator',
      type: 'checkbox',
      templateOptions: {
        label: 'Visble en sitio web.'
      }
    }];

    factory.orderType = [{
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
    },{
      key: 'transportInfo',
      type: 'select',
      templateOptions: {
        label: 'Transporte',
        options: [{
          "name": "Ninguno",
          "value": 0
        }, {
          "name": "Recojer",
          "value": 1
        }, {
          "name": "Entregar",
          "value": 2
        }, {
          "name": "Recojer/Entregar",
          "value": 3
        }]
      }
    }];

    return factory;
  });
