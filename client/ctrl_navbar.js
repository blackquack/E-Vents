var app = angular.module('app');

/* CONTROLLER APPLIES TO ALL PAGES */
app.controller('navbarController',
	['$scope', 'AuthService',
	function ($scope, AuthService) {

		$scope.isLogged = AuthService.loginStatus();
  
	}
]);