'use strict';
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
    $routeProvider.when('/portfolio', {templateUrl: 'partials/portfolio.html', controller: 'AboutCtrl'});
    $routeProvider.when('/resume', {templateUrl: 'partials/resume.html', controller: 'ResumeCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
}]);
