(function () {
    "use strict";

    angular.module("inventoryApp").controller("logController", [
        "$scope",
        "logService",
        "watches",
        "pubsubService",
        logController
    ]);

    function logController($scope, logService, watches, pubsubService) {
        setAllLogs();


        function clear() {
            $scope.searchFilter = "";
        }

        function setAllLogs() {
            logService.getAllLogs()
                .then(function (logs) {
                    $scope.logs = logs.data;
                    getAllDates();
                });
        }

        function getAllDates() {
            logService.getAllDates()
                .then(function (dates) {
                    $scope.dates = dates.data;
                });
        }


        $scope.filter = function () {
            //$scope.searchFilter = $scope.selectedDate;
        };

        $scope.clear = function () {
            $scope.searchFilter = "";
            $scope.selectedDate = "";
            $scope.statusFilter = "",
                pubsubService.clearFilter();

        };

        $scope.$watch(function () { return watches.getFilter(); }, function (newValue, oldValue) {
            if (newValue !== oldValue)
                $scope.searchFilter = newValue;
        });

        $scope.$watch(function () { return watches.getStatus(); }, function (newValue, oldValue) {
            if (newValue !== oldValue)
                $scope.statusFilter = newValue;
        });


        $scope.selectedDate = "";
        $scope.sortType = "device_key";
        $scope.sortReverse = false;
        $scope.searchFilter = "‎";
        $scope.statusFilter = "";
        clear();
    }

})();