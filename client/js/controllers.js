'use strict';

/* Controllers */

var controllers = angular.module('ngLunchit.controllers', []);

controllers.controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.loginPopup = function(){
        alert('popup');
    }
}]);