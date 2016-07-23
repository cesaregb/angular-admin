'use strict';

angular.module('processAdminApp')
  .service('serviceClients', function ($resource, constants) {
     return $resource(constants.API_ENDPOINT + '/clients/:client',{client: "@client"});
  });
