(function () {
    "use strict";

    angular.module("inventoryApp")
        .factory("pubsubService", [
            "$rootScope",
            pubsubService
        ]);

    function pubsubService($rootScope) {
        var CLEAR_FILTER = "clearFilter";

        var clearFilter = function () {
            $rootScope.$broadcast(CLEAR_FILTER, {
                filter: "",
                status: ""
            });
        };

        var onClearFilter = function ($scope, handler) {
            $scope.$on(CLEAR_FILTER,
                function (event, message) {
                    handler(message);
                });
        };

        return {
            clearFilter: clearFilter,
            onClearFilter: onClearFilter
        };
    }

})();