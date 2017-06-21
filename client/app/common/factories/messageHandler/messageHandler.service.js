'use strict';

function messageHandlerService(noty, $log) {
  var factory = {};

  factory.showError = function(message){
    noty.showNoty({
      text: message,
      ttl: 1000 * 3,
      type: 'warning'
    });
  };

  factory.showSuccess = function(message){
    noty.showNoty({
      text: message,
      ttl: 1000 * 3,
      type: 'success'
    });
  };

  return factory;
}


angular.module('processAdminApp')
  .factory('messageHandler', messageHandlerService);
