/**
 * Created by Jonathon on 12/9/2016.
 */
(function () {
    "use strict";

    angular.module("inventoryApp").controller("inventoryController", [
        "$scope",
        "$http",
        "serverService",
        inventoryController
    ]);

    function inventoryController($scope, $http, serverService) {
        setServers();

        function setServers() {
            serverService.getServers()
                .then(function (response) {
                    $scope.runInventory = response.data;
                });
        }

        function addLogSuccess(event) {
            $scope.item = "";

            var glyph = $("#racTable > tbody")
                .find("span:contains('" + event + "')")
                .parents().eq(1).find("td:last-child > span");

            glyph.removeClass("glyphicon-exclamation-sign");
            glyph.addClass("glyphicon-check");
        }

        function scanFail() {
            alert("Scan Fail: try a rescan.");
            $scope.item = "";
        }




        $scope.applyEntry = function ($event) {
            if ($event !== "") {
                serverService.addServerToInventory($event)
                    .then(function(response) {
                        addLogSuccess(response.data);
                    });
            } else {
                scanFail();
            }
        };

        $scope.complete = [];
        $scope.item = "";

    }


})();