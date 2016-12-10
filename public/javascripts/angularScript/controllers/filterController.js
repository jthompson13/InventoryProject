(function () {
    "use strict";

    angular.module("inventoryApp")
        .controller("filterController", [
            "$scope",
            "watches",
            "pubsubService",
            filterController
        ]);


    function filterController($scope, watches, pubsubService) {
        $scope.searchFilter = "";
        $scope.statusFilter = "";

        pubsubService.onClearFilter($scope,
            function (message) {
                $scope.searchFilter = message.filter;
                $scope.statusFilter = message.status;

                $("a.btn.btn-block.dropdown-toggle.dropdown-menu").html('Filter Status <span class="caret"></span>');
            });

        $scope.$watch("searchFilter",
            function (newValue, oldValue) {
                if (newValue !== oldValue) watches.setFilter(newValue);
            });

        $scope.$watch("statusFilter",
            function (newValue, oldValue) {
                if (newValue !== oldValue) watches.setStatus(newValue);
            });


        $scope.filter = function (fil) {
            $scope.searchFilter = fil;
            $scope.apply();
        };

        $scope.filterStatus = function (stat) {
            $scope.statusFilter = stat;
            $scope.apply();
        };
    }

})();