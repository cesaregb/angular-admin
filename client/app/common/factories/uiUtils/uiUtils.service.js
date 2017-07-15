'use strict';

angular.module('processAdminApp')
  .factory('uiUtils', function (factoryServices, $uibModal, $log, messageHandler) {
    let factory = {};
    factory.showOrderHistory = function (idOrder) {
      if (!Boolean(idOrder)) {
        messageHandler.showError(`Orden ${idOrder} no encontrada`);
        return;
      }

      factoryServices.getResourceById('orders', idOrder).then((order) => {
        let modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'app/orders/orderInfoModal/orderInfoModal.html',
          controller: 'OrderInfoModalCtrl',
          size: 'lg',
          resolve: {
            injectData: function () {
              return order;
            }
          }
        });
        modalInstance.result.then(function (resultItem) {
        });
      }, () => {
        messageHandler.showError(`Orden ${idOrder} no encontrada`);
      });

    };

    factory.showClientOrders = function (client) {
      factoryServices.getOrdersByClient(client.idClient).then((orders) => {
        let modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'app/modals/clientOrderHistoryModal/clientOrderHistoryModal.html',
          controller: 'ClientOrderHistoryModalCtrl',
          size: 'lg',
          resolve: {
            orders: function () {
              return orders;
            },
            client: function () {
              return client;
            }
          }
        });
        modalInstance.result.then((resultItem) => {
        });
      }, () => {
        messageHandler.showError(`cliente ${client.idClient} no encontrado`);
      });


    };


    return factory;

  });
