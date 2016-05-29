'use strict';

angular.module('processAdminApp')
  .factory('factoryClients', function (factoryCommon, noty) {

    var factory = {};

    //********** Clients CRUD
    factory.getClients = function () {
       return factoryCommon.get("/clients");
    };
    factory.getClientById = function (clientId) {
       return factoryCommon.get("/clients/" + clientId);
    };
    factory.getClientByFilter = function (object) {
       return factoryCommon.post(object, "/clients/byFilters");
    };
    factory.getClientByIdAddress = function (idAddress) {
       return factoryCommon.get("/clients/addressId/" + idAddress);
    };
    factory.saveClient = function (data) {
       return factoryCommon.save(data, "/clients");
    };
    factory.updateClient = function (data) {
       return factoryCommon.put(data, "/clients");
    };
    factory.deleteClient = function (data) {
       return factoryCommon.delete(data, "/clients/" + data.idClient);
    };

    //********** Phone Numbers CRUD
    factory.getPhoneNumbers = function () {
       return factoryCommon.get("/phone-number");
    };
    factory.savePhoneNumber = function ( data ) {
       return factoryCommon.save(data, "/phone-number");
    };
    factory.updatePhoneNumber = function ( data ) {
       return factoryCommon.put(data, "/phone-number");
    };
    factory.deletePhoneNumber = function ( data ) {
       return factoryCommon.delete(data, "/phone-number/" + + data.idPhoneNumber);
    };

    // method used for transitional updates.
    factory.savePhoneNumberCallback = function(phone, callback){
      this.savePhoneNumber(phone).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    // method used for transitional updates.
    factory.updatePhoneNumberCallback = function(phone, callback){
      this.updatePhoneNumber(phone).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    //********** Address Numbers CRUD
    factory.getAddress = function () {
       return factoryCommon.get("/address");
    };
    factory.saveAddress = function ( data ) {
       return factoryCommon.post(data, "/address");
    };
    factory.updateAddress = function ( data ) {
       return factoryCommon.put(data, "/address");
    };
    factory.deleteAddress = function ( data ) {
       return factoryCommon.delete(data, "/address/" + data.idAddress);
    };


    // method used for transitional updates.
    factory.saveAddressCallback = function(address, callback){
      this.saveAddress(address).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    // method used for transitional updates.
    factory.updateAddressCallback = function(address, callback){
      this.updateAddress(address).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    //********** clientPaymentInfoFields
    factory.getClientPaymentInfo = function () {
       return factoryCommon.get("/client-payment-info");
    };
    factory.saveClientPaymentInfo = function ( data ) {
       return factoryCommon.post(data, "/client-payment-info");
    };
    factory.updateClientPaymentInfo = function ( data ) {
       return factoryCommon.put(data, "/client-payment-info");
    };
    factory.deleteClientPaymentInfo = function ( data ) {
       return factoryCommon.delete(data, "/client-payment-info/" + data.idClientPaymentInfo);
    };

    // method used for transitional updates.
    factory.saveClientPaymentInfoCallback = function(address, callback){
      this.saveClientPaymentInfo(address).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    // method used for transitional updates.
    factory.updateClientPaymentInfoCallback = function(address, callback){
      this.updateClientPaymentInfo(address).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    return factory;

  });
