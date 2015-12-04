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
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'profileController',
    access : { restricted : true}
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
