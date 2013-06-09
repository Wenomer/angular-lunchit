'use strict';

/* Directives */

var directives = angular.module('ngLunchit.directives', []);

directives.directive('menuPoint', function($location) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            var href = element.find('a').attr('href');

            if(href.slice(2) == $location.path()){
                element.addClass('active');
            }
        }
    }
});