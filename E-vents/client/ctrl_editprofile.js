var app = angular.module('app');

app.controller('editprofileController',
	['$scope', 'UserService', '$location', 'AuthService',
  	function ($scope, UserService, $location, AuthService) {

    	if (AuthService.loginStatus() == false) {
        	$location.path('/register')
        	return
    	}

    	$scope.username = AuthService.getUserInfo().username;
    	$scope.name = AuthService.getUserInfo().name;
    	$scope.id = AuthService.getUserInfo()._id;

	    $scope.submitEdits = function () {
	    	UserService.editUser.save({
	    		name: "test",
	    		description: "test"
	    	})
	    }
  	}
]);