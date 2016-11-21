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
        name:'adadadadadadadasd',
        uri:'/clients/client-payment-info'
      },
      clientBag: {
        name:'adadadadadadadasd',
        uri: '/client-bag'
      },
      services: {
        name:'services',
        uri: '/services'
      },
      serviceType: {
        name:'adadadadadadadasd',
        uri: '/services/service-type'
      },
      serviceTypeSpec: {
        name:'adadadadadadadasd',
        uri: '/services/service-type/service-type-specs'
      },
      serviceTypeTask: {
        name:'adadadadadadadasd',
        uri: '/services/service-type/service-type-task'
      },
      serviceCategory: {
        name:'adadadadadadadasd',
        uri: '/service-category'
      },
      orderType: {
        name:'adadadadadadadasd',
        uri: '/order/order-type'
      },
      orderTypeTask: {
        name:'adadadadadadadasd',
        uri: '/order/order-type/order-type-task'
      },
      orders: {
        name:'adadadadadadadasd',
        uri: '/orders'
      },
      taskType: {
        name:'adadadadadadadasd',
        uri: '/tasks/task-type'
      },
      tasks: {
        name:'adadadadadadadasd',
        uri: '/tasks'
      },
      specs: {
        name:'adadadadadadadasd',
        uri: '/specs'
      },
      specsValue: {
        name:'adadadadadadadasd',
        uri: '/spec/specs-value'
      },
      supplies: {
        name:'adadadadadadadasd',
        uri: '/supplies'
      },
      supplyType: {
        name:'adadadadadadadasd',
        uri: '/supplies/supply-type'
      },
      distanceInfo: {
        name:'adadadadadadadasd',
        uri: '/distance-info'
      },
      appOrder: {
        name:'adadadadadadadasd',
        uri: '/app-orders'
      },
      products: {
        name:'adadadadadadadasd',
        uri: '/products'
      },
      productType: {
        name:'adadadadadadadasd',
        uri: '/products/productType'
      },
      stores: {
        name:'adadadadadadadasd',
        uri: '/stores'
      },
      routes: {
        name:'adadadadadadadasd',
        uri: '/routes'
      },
      calendarRoutes: {
        name:'adadadadadadadasd',
        uri: '/calendarRoutes'
      },
      stops: {
        name:'adadadadadadadasd',
        uri: '/stops'
      },
      employees: {
        name:'adadadadadadadasd',
        uri: '/employees'
      },
      employeeType: {
        name:'adadadadadadadasd',
        uri: '/employees/employee-type'
      },
      assetType: {
        name:'adadadadadadadasd',
        uri: '/asset-type'
      },
      assets: {
        name:'adadadadadadadasd',
        uri: '/assets'
      }
    };
    factory.uris = uris;

    factory.getResources = function (idUri) {
      return factoryCommon.get(uris[idUri].uri);
    };

    factory.getResourceById = function (idUri, idResource) {
      return factoryCommon.get(uris[idUri].uri + '/byId/' + idResource);
    };

    factory.saveResource = function (idUri, data) {
      return factoryCommon.save(data, uris[idUri].uri);
    };
    factory.updateResource = function (idUri, data) {
      return factoryCommon.put(data, uris[idUri].uri);
    };
    factory.deleteResource = function (idUri, idResource) {
      return factoryCommon.delete(uris[idUri].uri + '/' + idResource);
    };

    factory.saveResourceCallback = function (idUri, dataInput, callback) {
      this.saveResource(idUri, dataInput).then(function (result) {
        callback();
      }),
        function (error) {
          callback();
        }
    };

    factory.updateResourceCallback = function (idUri, dataInput, callback) {
      this.updateResource(idUri, dataInput).then(function (result) {
        callback();
      }),
        function (error) {
          callback();
        }
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
