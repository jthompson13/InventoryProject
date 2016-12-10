(function () {
    "use strict";

    angular.module("inventoryApp")
        .factory("watches", function () {
        var data = {
            searchFilter: "",
            statusFilter: ""
        };

        return {
            getFilter: function () {
                return data.searchFilter;
            },

            setFilter: function (filter) {
                data.searchFilter = filter;
            },

            getStatus: function () {
                return data.statusFilter;
            },

            setStatus: function (status) {
                data.statusFilter = status;
            }
        };
    });

})();