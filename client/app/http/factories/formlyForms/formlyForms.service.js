'use strict';

angular.module('processAdminApp')
  .factory('formlyForms', function() {
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

    factory.addressFields = [
      {
      key: 'country',
      type: 'horizontalInput',
      defaultValue: 'Mexico',
      templateOptions: {
        type: 'text',
        label: 'Pais'
      }
    }, {
      key: 'state',
      type: 'horizontalInput',
      defaultValue: 'Jalisco',
      templateOptions: {
        type: 'text',
        label: 'Estado'
      }
    }, {
      key: 'zipcode',
      type: 'horizontalInput',
      templateOptions: {
        type: 'text',
        label: 'Codigo Postal'
      }
    }, {
      key: 'city',
      type: 'horizontalInput',
      defaultValue: 'Guadalajara',
      templateOptions: {
        type: 'text',
        label: 'Ciudad',
        required: true
      }
    }, {
      key: 'address',
      type: 'horizontalInput',
      templateOptions: {
        type: 'text',
        label: 'Calle y Numero',
        required: true
      }
    }, {
      key: 'address2',
      type: 'horizontalInput',
      templateOptions: {
        type: 'text',
        label: 'Colonia',
        required: true
      }
    }, {
      key: 'comments',
      type: 'horizontalInput',
      templateOptions: {
        type: 'text',
        label: 'Commentarios'
      }
    }];

    return factory;
  });
