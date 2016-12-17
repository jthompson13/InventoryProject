(function () {
    "use strict";

    angular.module("inventoryApp").factory("logService", [
        "$http",
        logService
    ]);

    function logService($http) {
        return {
            getAllLogs: getAllLogs,
            getAllDates: getAllDates
        };

        function getAllLogs() {
            return $http.get("logs/../getAllLogs");
        }

        function getAllDates() {
            return $http.get("log/../getAllDates");
        }
 
    }

})();