'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clientPaymentInfo', {
        url: '/clientPaymentInfo',
        template: '<client-payment-info></client-payment-info>',
        params : {client : null}
      });
  });
