'use strict';

angular.module('processAdminApp')
  .service('serviceClients', function ($resource, appContext) {
     return $resource(appContext.appContextObject.sodEndpoint + '/clients/:client',{client: "@client"});
  });
