'use strict';

/* Directives */

var directives = angular.module('ngLunchit.directives', []);

directives.directive('menuPoint', function($location) {

    var checkLink = function(href, element){
        if(href.slice(2) == $location.path()){
            element.addClass('active');
        } else {
            element.removeClass('active');
        }
    };

    return {
        restrict: 'A',

        link: function ($scope, element) {
            var href = element.find('a').attr('href');

            checkLink(href, element);

            $scope.$on("$routeChangeStart", function () {
                checkLink(href, element);
            });
        }

    }
});