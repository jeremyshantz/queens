'use strict';

var app = angular.module('app', []);

app.directive('queens', function ($timeout) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope) {

            $scope.n = 6;
            $scope.count = 1;
            $scope.queen = new Queen($scope.n);
            $scope.queen.tryNext();


            var add = function() {

                $timeout(function(){
                    //  $scope.queen.tryNext();
                    $scope.count++;
                    if ($scope.count < 20) {
                        add();
                    }
                }, 50, true);
            };

            add();
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
