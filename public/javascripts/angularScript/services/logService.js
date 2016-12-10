(function () {
    "use strict";

    angular.module("inventoryApp").factory("logService", [
        "$http",
        logService
    ]);

    function logService($http) {
        var lService = {};
        lService.getAllLogs = function () {
            return $http.get("logs/../getAllLogs");
        };

        lService.getAllDates = function () {
            return $http.get("/getAllDates");
        };
        return lService;
    }

})();