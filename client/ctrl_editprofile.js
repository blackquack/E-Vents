var app = angular.module('app');

app.controller('editprofileController',
	['$scope', 'UserService', '$location', 'AuthService', '$rootScope',
  	function ($scope, UserService, $location, AuthService, $rootScope) {

    	if (AuthService.loginStatus() == false) {
        	$location.path('/')
        	return
    	}
	  if ($rootScope.edit == true){
		  USERNAME = $rootScope.toEdit
	  }
	  else{
      	USERNAME = AuthService.getUserInfo().username
  	  }
	  console.log(USERNAME);
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

		if ($rootScope.edit == true){
			$location.path('/admin/dashboard');
		}
		else{
			$location.path('/myprofile');
		}

	    }




  	}
]);
