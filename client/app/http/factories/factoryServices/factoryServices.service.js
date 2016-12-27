'use strict';

angular.module('processAdminApp')
  .factory('factoryServices', function (factoryCommon, noty, $log, $q, $filter) {
    const ACTIVE = 0;
    var factory = {};

    var uris = {
      clients:{
        name:'clients',
        uri:'/clients'
      },
      clientType:{
        name:'clientType',
        uri:'/clients/client-type'
      },
      phoneNumber:{
        name:'phoneNumber',
        uri:'/clients/phone-number'
      },
      address:{
        name:'address',
        uri:'/clients/address'
      },
      clientPaymentInfo:{
        uri:'/clients/client-payment-info'
      },
      clientBag: {
        uri: '/client-bag'
      },
      services: {
        name:'services',
        uri: '/services'
      },
      serviceType: {
        uri: '/services/service-type'
      },
      serviceTypeSpec: {
        uri: '/services/service-type/service-type-specs'
      },
      serviceTypeTask: {
        uri: '/services/service-type/service-type-task'
      },
      serviceCategory: {
        uri: '/service-category'
      },
      orderType: {
        uri: '/order/order-type'
      },
      orderTypeTask: {
        uri: '/order/order-type/order-type-task'
      },
      orders: {
        uri: '/orders'
      },
      taskType: {
        uri: '/tasks/task-type'
      },
      tasks: {
        uri: '/tasks'
      },
      specs: {
        uri: '/specs'
      },
      specsValue: {
        uri: '/spec/specs-value'
      },
      supplies: {
        uri: '/supplies'
      },
      supplyType: {
        uri: '/supplies/supply-type'
      },
      distanceInfo: {
        uri: '/distance-info'
      },
      appOrder: {
        uri: '/app-orders'
      },
      products: {
        uri: '/products'
      },
      productType: {
        uri: '/products/productType'
      },
      stores: {
        uri: '/stores'
      },
      routes: {
        uri: '/routes'
      },
      calendarRoutes: {
        uri: '/calendarRoutes'
      },
      stops: {
        uri: '/stops'
      },
      employees: {
        uri: '/employees'
      },
      employeeType: {
        uri: '/employees/employee-type'
      },
      assetType: {
        uri: '/asset-type'
      },
      assets: {
        uri: '/assets'
      }
    };
    factory.uris = uris;

    factory.getResources = function (idUri) {
      $log.debug('[getResources] idUri: ' + idUri);
      return factoryCommon.get(uris[idUri].uri);
    };

    factory.getResourceById = function (idUri, idResource) {
      $log.debug('[getResourceById] idUri: ' + idUri);
      return factoryCommon.get(uris[idUri].uri + '/byId/' + idResource);
    };

    factory.saveResource = function (idUri, data) {
      $log.debug('[saveResource] idUri: ' + idUri);
      return factoryCommon.save(data, uris[idUri].uri);
    };
    factory.updateResource = function (idUri, data) {
      $log.debug('[updateResource] idUri: ' + idUri);
      return factoryCommon.put(data, uris[idUri].uri);
    };
    factory.deleteResource = function (idUri, idResource) {
      $log.debug('[deleteResource] idUri: ' + idUri);
      return factoryCommon.delete(uris[idUri].uri + '/' + idResource);
    };

    // End General

    factory.getResourcesForTable = function (idUri, params) {
      var deferred = $q.defer();
      this.getResources(idUri).then(function (result) {
        var filterData = params.filter() ?
          $filter('filter')(result, params.filter()) :
          result;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filterData, params.orderBy()) :
          filterData;

        var sortOrdResult = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
        deferred.resolve(sortOrdResult);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    //
    factory.getResourcesForTableSpecific = function (functionPromice, params) {
      var deferred = $q.defer();
      functionPromice.then(function (result) {
        var filterData = params.filter() ?
          $filter('filter')(result, params.filter()) :
          result;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filterData, params.orderBy()) :
          filterData;

        var sortOrdResult = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
        deferred.resolve(sortOrdResult);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    // ******* non repetetive...
    factory.getSpecValuesBySpec = function (idSpec) {
      var uri = uris.specsValue.uri;
      return factoryCommon.get(uri + "/spec/" + idSpec);
    };

    factory.getTaskByType = function (idTasktype) {
      var uri = uris.task.uri + '/taskType/' + idTasktype;
      return factoryCommon.get(uri);
    };

    factory.getTaskTypeBySection = function (flag) {
      var uri = uris.taskType.uri + '/filter/' + flag;
      return factoryCommon.get(uri);
    };

    factory.getServiceTypeSpecById = function (id) {
      var uri = uris.serviceTypeSpec.uri + '/byServiceType/' + id;
      return factoryCommon.get(uri);
    };

    factory.getServiceOrderDetails = function () {
      var uri = uris.appOrder.uri + '/orderTypes';
      return factoryCommon.get(uri);
    };

    factory.addOrderServiceType = function (orderType) {
      var uri = uris.orderType.uri + '/add/serviceType';
      return factoryCommon.put(orderType, uri);
    };

    factory.saveOrder = function (order) {
      var uri = uris.appOrder.uri;
      return factoryCommon.post(order, uri);
    };

    factory.getOrdersByStatus = function (status) {
      var uri = uris.oder.uri + '/by/status/' + status;
      return factoryCommon.get(uri);
    };

    factory.getUIOrder = function (orderId) {
      var uri = uris.oder.uri + '/forEdit/' + orderId;
      return factoryCommon.get(uri);
    };

    factory.getActiveOrders = function () {
      return factory.getOrdersByStatus(ACTIVE);
    };

    factory.getProductsByName = function (name) {
      var uri = uris.product.uri + '/name/' + name;
      return factoryCommon.get(uri);
    };

    factory.getProductsByType = function (idProductType) {
      var uri = uris.product.uri + '/type/' + idProductType;
      return factoryCommon.get(uri);
    };

    factory.addProducts = function (idServiceType, productTypes) {
      var uri = uris.serviceType.uri + '/addProducts/' + idServiceType;
      return factoryCommon.post(productTypes, uri);
    };

    factory.getProductsByProductTypes = function (ids) {
      var uri = uris.product.uri + '/byProductTypes';
      // sending ids as post ...
      return factoryCommon.post(ids, uri);
    };

    factory.getClientByFilter = function (object) {
      var uri = uris.client.uri + '/clients/byFilters';
      return factoryCommon.post(object, uri);
    };
    factory.getClientByIdAddress = function (idAddress) {
      return factoryCommon.get(uris.clients.uri + '/addressId/' + idAddress);
    };

    factory.getAddressByStop = function (type, id) {
      return factoryCommon.get(uris.stops.uri + '/address/' + type + '/' + id);
    };


    return factory;

  });
