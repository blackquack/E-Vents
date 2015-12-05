var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
<<<<<<< HEAD
      templateUrl: 'views/home.html',
=======
        templateUrl: 'views/home.html',
>>>>>>> a903f0e4a4dfe1f79992c8beac245e332f62c507
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
<<<<<<< HEAD
      templateUrl: 'views/register_post.html',
      controller: 'registerPostingController'    
    })
    .when('/about', {
      templateUrl: 'views/about.html',   
    })
    .when('/event/:id', {
      templateUrl: 'views/event.html',   
      controller: 'eventController'
=======
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
    .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileController',
        access : { restricted : true}
>>>>>>> a903f0e4a4dfe1f79992c8beac245e332f62c507
    })
    .otherwise({redirectTo: '/'});
});

app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
/*app.run(function ($rootScope, $location, $route, AuthService) {
$rootScope.$on('$routeChangeStart', function (event, next, current) {
if (next.access == undefined ||
next.access.restricted && AuthService.getUser() === null) {
$location.path('/home');
$route.reload();
}
});
});
*/
