var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
    })
    .when('/login', {
      templateUrl: 'views/login.html', 
      controller: 'loginController',
    })
    .when('/register', {
      templateUrl: 'views/register.html', 
      controller: 'registerController',
    })
    .when('/createEvent', {
      templateUrl: 'views/register_post.html',
      controller: 'registerPostingController'    
    })
    .when('/about', {
      templateUrl: 'views/about.html',   
    })
    .when('/event/:id', {
      templateUrl: 'views/event.html',   
      controller: 'eventController'
    })
    .otherwise({redirectTo: '/'});
});