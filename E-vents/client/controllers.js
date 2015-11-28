/* handle login and submit */
angular.module('app').controller('loginController',
  ['$scope', '$location', 'AuthService', 'UserService',
  function ($scope, $location, AuthService, UserService) {

    // user clicks log in
    $scope.login = function () {
      $scope.error = false;

      // call login from service
      AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {

          //update the user's location
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
              console.log("Geolocation is not supported by this browser.");
          }

          function showPosition(position) {
            UserService.getUser(AuthService.getUser())
              .then(function (result) {
                var user = result[0];
                var cords = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;
                UserService.updateUserBehaviour(user.username, user.pages, cords);
              })
          }

          $location.path('/welcome');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid email and/or password";
        });

    };
}]);

/* handle logout */
angular.module('app').controller('logoutController',
  ['$scope', '$location', 'AuthService', 'UserService',
  function ($scope, $location, AuthService, UserService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
}]);

/* handle login and register */
angular.module('app').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;

      if ($scope.registerForm.password != $scope.registerForm.confirmPassword) {
        $scope.error = true;
        $scope.errorMessage = 'Passwords dont match!';
        return;
      };

      // call register from service
      AuthService.register($scope.registerForm.email, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = 'Email already exist!';
        });

    };
}]);