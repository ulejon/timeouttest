var timeoutApp = angular.module('timeoutApp', ['ngResource']);

timeoutApp.controller('timeoutCtrl', function ($scope, $resource) {
    var Timeout = $resource('/timeout', {}, {});

    var TestTimeout = $resource('/test', {}, {});

    Timeout.get({}, function(timeout) {
        $scope.timeout = timeout.timeout;
    });

    $scope.updateTimeout = function (timeout) {
        var newTimeout = new Timeout({timeout: timeout});
        newTimeout.$save();
    };

    $scope.timeoutTestRes = "";
    $scope.testTimeout = function () {
        $scope.timeoutTestRes = "Testing";
        TestTimeout.get({}, function (res) {
            $scope.timeoutTestRes = "Done"
        })
    };

    $scope.clear = function () {
        console.log("Clear");
        $scope.timeoutTestRes = "";
    }
});

