var timeoutApp = angular.module('timeoutApp', ['ngResource', 'ngRoute', 'ui.bootstrap']);

timeoutApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/start', {
                templateUrl: 'assets/start.html',
                controller: 'timeoutCtrl'
            }).
            when('/hello', {
                templateUrl: 'assets/hello.html',
                controller: 'helloCtrl'
            }).
            otherwise({
                redirectTo: '/start'
            });
    }]);

timeoutApp.controller('headerCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
});

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

    $scope.timeoutTestRes = null;

    $scope.testTimeout = function () {
        $scope.timeoutTestRes = "Testing";
        TestTimeout.get({}, function (res) {
            $scope.timeoutTestRes = "Done";
        });
    };

    $scope.performingTest = function () {
        return $scope.timeoutTestRes !== null;
    };

    $scope.isRequestingData = function () {
        return $scope.timeoutTestRes == 'Testing';
    };

    $scope.clearTestResultInfo = function () {
        $scope.timeoutTestRes = null;
    };

    $scope.testUrl = function () {
        var route = jsRoutes.controllers.Application.performTimeoutTest();
        return route.absoluteURL();
    };
});

timeoutApp.controller('helloCtrl', function ($scope, $resource) {

});

