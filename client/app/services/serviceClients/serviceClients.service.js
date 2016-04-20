'use strict';

angular.module('processAdminApp')
  .service('serviceClients', function ($resource, API_ENDPOINT) {
     return $resource(API_ENDPOINT + '/clients/:client',{client: "@client"});
  });
