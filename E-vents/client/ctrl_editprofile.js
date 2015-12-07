var app = angular.module('app');

app.controller('editprofileController',
	['$scope', 'UserService', '$location', 'AuthService',
  	function ($scope, UserService, $location, AuthService) {

    	if (AuthService.loginStatus() == false) {
        	$location.path('/')
        	return
    	}

      USERNAME = AuthService.getUserInfo().username

    	$scope.username = USERNAME
    	$scope.name = AuthService.getUserInfo().name
      $scope.description = AuthService.getUserInfo().description

	    $scope.submitEdits = function() {
        UserService.editUser.save({
          user: USERNAME,
          name: $scope.name,
          description: $scope.description
        })
	    }




  	}
]);