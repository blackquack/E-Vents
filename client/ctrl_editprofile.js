var app = angular.module('app');

app.controller('editprofileController',
	['$scope', 'UserService', '$location', 'AuthService',
  	function ($scope, UserService, $location, AuthService) {

    	if (AuthService.loginStatus() == false) {
        	$location.path('/')
        	return
    	}

      USERNAME = AuthService.getUserInfo().username

      UserService.getUser.get({user: USERNAME}, 
      function(user){
            $scope.username = USERNAME
            $scope.name = user.name
            $scope.description = user.description
      })

	    $scope.submitEdits = function() {
        UserService.editUser.save({
          user: USERNAME,
          name: $scope.name,
          description: $scope.description
        })

        $location.path('/myprofile')
	    }




  	}
]);