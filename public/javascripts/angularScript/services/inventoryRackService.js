(function () {
    "use strict";

    angular.module("InventoryApp").factory("inventoryRackService", [
        "$http",
        inventoryRackService
    ]);

    function inventoryRackService($http) {
        var rackService = {};

        rackService.getInventory = function (rack) {
            return $http.post("/GetInventoryForRack", { rack: rack });
        };

        return rackService;
    }


})();