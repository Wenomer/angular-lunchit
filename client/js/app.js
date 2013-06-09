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
        $routeProvider.when('/menu', {
            templateUrl : 'view/page/menu.html'
        });
        $routeProvider.when('/', {
            templateUrl : 'view/page/dashboard.html'
        });
        $routeProvider.otherwise({
            redirectTo : '/'
        });
    }]);

app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);

app.run(['$rootScope','$location', function($rootScope, $location){

    }]);