'use strict';

var ngLunchit = {};

var app = angular.module('ngLunchit', [
    'ngLunchit.filters',
    'ngLunchit.directives',
    'ngLunchit.controllers',
    'ngLunchit.services'
]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {
//        $routeProvider.when('/signup', {
//            templateUrl : 'view/page/signup.html',
//            controller : 'SignupPageCtrl'
//        });
        $routeProvider.otherwise({
            redirectTo : '/',
            controller : 'IndexCtrl',
            templateUrl: 'view/main.html'
        });
    }]);

app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);

app.run(['$rootScope','$location', function($rootScope, $location){

    }]);