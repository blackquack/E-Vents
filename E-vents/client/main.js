var app = angular.module('crud_app', ['ngRoute', 'ngFileUpload']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: 'views/login.html'})
    .when('/login', {
      templateUrl: 'views/login.html', 
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/register', {
      templateUrl: 'views/register.html', 
      controller: 'registerController',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
});

// The $routeChangeStart event happens before the actual route change occurs. 
// So, whenever a route is accessed, before the view is served, 
// we ensure that the user is logged in. Test this out!

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access == undefined || 
        next.access.restricted && AuthService.getUser() === null) {
      $location.path('/login');
      $route.reload();
    }
  });
});