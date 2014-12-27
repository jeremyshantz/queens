'use strict';

var app = angular.module('app', []);

app.directive('queens', function ($timeout) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope) {

            $scope.n = 5;
            $scope.count = 1;
            $scope.queen = new Queen($scope.n);
            $scope.queen.solve(0);
        },
        templateUrl: 'partials/queens.html'
    };
});

app.directive('board', function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            board: '=board'
        },
        controller: function ($scope) {

        },
        templateUrl: 'partials/board.html'
    };
});
