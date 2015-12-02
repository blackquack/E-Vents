/* handle login and submit */
angular.module('app').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    // user clicks log in
    $scope.login = function () {
      $scope.error = false;

      // call login from service
      AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {

          //update the user's location
          $location.path('/welcome');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid email and/or password";
        });

      };
    }]);

angular.module('app').controller('homeController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.greet = "Home Page";
  }]);
/* handle logout */
angular.module('app').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

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
          console.log("Redirecting to login page");
          $location.path('/login');
        })
        // handle error
        .catch(function () {
          console.log("error occur");
          $scope.error = true;
          $scope.errorMessage = 'Email already exist!';
        });

      };
    }]);

/* handle navigaton bar on the top */


/* handle the welcome page */
angular.module('app').controller('welcomeController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
      $scope.username = AuthService.getUser();

  }]);
