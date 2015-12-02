var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController',
      access : { restricted : false}
    })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController',
    access : { restricted : false}
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerController',
    access : { restricted : false}
  })
  .when('/events', {
    templateUrl: 'views/posting.html',
    controller: 'postingController',
    access : { restricted : true}
  })
  .when('/welcome', {
    templateUrl: 'views/welcome.html',
    controller: 'welcomeController',
    access : { restricted : true}
  })
  .otherwise({redirectTo: '/'});
});

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