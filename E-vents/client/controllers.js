/* handle login and submit */
angular.module('app').controller('loginController',
  ['$scope', '$location', 'AuthService', '$route', '$window',
  function ($scope, $location, AuthService,$route,$window) {

    // user clicks log in
    $scope.login = function () {
      $scope.error = false;

      // call login from service
      AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {
          console.log("normal working");
          //update the user's location

           $window.location.reload();
           $location.path('/');

        })
        //
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid email and/or password";
        });

      };
      $scope.login_twitter = function () {

        // call login from service
        AuthService.login_twitter()
          // handle success
          .then(function () {
            console.log("oath working");
            //update the user's location
            //$location.path('/');

          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Can't connect to twitter ";
          });

        };
    }]);

angular.module('app').controller('homeController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    console.log("hello");
    console.log(AuthService.loginStatus());
    $scope.isLogged = AuthService.loginStatus();
    console.log(AuthService.getUserInfo());
    $scope.greet = "Home Page";
    if ($scope.isLogged){
      $scope.username = AuthService.getUserInfo().name;
    }
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
      console.log("Showing email: " + $scope.registerForm.email );
      console.log("Showing name: " + $scope.registerForm.name);
      console.log("Showing password: " + $scope.registerForm.password);
      // call register from service
      AuthService.register($scope.registerForm.email, $scope.registerForm.password, $scope.registerForm.name)
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
angular.module('app').controller('profileController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.name = AuthService.getUserInfo().name;
    $scope.greet = "Home Page";

  }]);
