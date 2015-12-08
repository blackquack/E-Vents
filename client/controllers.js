/* handle login and submit */
angular.module('app').controller('loginController',
['$scope', '$location', 'AuthService', '$route', '$window', '$mdToast', '$document',
function ($scope, $location, AuthService,$route,$window, $mdToast, $document) {

    $scope.isLogged = AuthService.loginStatus();
    $scope.greet = "Home Page";
    if ($scope.isLogged){
        $scope.username = AuthService.getUserInfo().name;
    }
    // user clicks log in
    $scope.login = function () {

        if ($scope.loginForm == undefined) return
        if ($scope.loginForm.email == undefined || $scope.loginForm.email == "") return
        if ($scope.loginForm.password == undefined || $scope.loginForm.password == "") return

        // call login from service
        AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {
            //console.log("Conneted!");
            $window.location.reload();
            $location.path('/');

        })
        //
        .catch(function () {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Invalid username or password.')
                .position("right")
                .hideDelay(3000)
            );
        });

    };
    $scope.login_twitter = function () {

        // call login from service
        AuthService.login_twitter()
        // handle success
        .then(function () {
            //console.log("oath working");
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

    $scope.isLogged = AuthService.loginStatus();

    $scope.greet = "Home Page";
    if ($scope.isLogged){
        $scope.username = AuthService.getUserInfo().name;
    }
}]);
/* handle logout */
angular.module('app').controller('logoutController',
['$scope', '$location', 'AuthService', '$window',
function ($scope, $location, AuthService,$window) {
    $scope.isLogged = AuthService.loginStatus();
    if ($scope.isLogged){
        $scope.username = AuthService.getUserInfo().name;
    }
    $scope.logout = function () {

        // call logout from service
        AuthService.logout()
        .then(function () {
            $window.location.reload();
            $location.path('/');
        });
    };
    if (AuthService.getUserInfo() != null) {
        $scope.name = AuthService.getUserInfo().username
        if (AuthService.getUserInfo().name != null) $scope.name = AuthService.getUserInfo().name
    }
}]);

/* handle login and register */
angular.module('app').controller('registerController',
['$scope', '$location', 'AuthService', '$window',
function ($scope, $location, AuthService,$window) {

    $scope.register = function () {
        // initial values
        $scope.error = false;

        if ($scope.registerForm.password != $scope.registerForm.confirmPassword) {
            $scope.error = true;
            $scope.errorMessage = 'Passwords dont match!';
            return;
        };

        if ($scope.registerForm.name == '') {
            $scope.error = true;
            $scope.errorMessage = 'Name required!';
            return;
        };
        // call register from service
        if ($scope.error == false){
            AuthService.register($scope.registerForm.email, $scope.registerForm.password, $scope.registerForm.name)
            // handle success
            .then(function () {

                AuthService.login($scope.registerForm.email, $scope.registerForm.password)
                // handle success
                .then(function () {
                    //console.log("Conneted!");
                    $window.location.reload();
                    $location.path('/');

                });

            })
            // handle error
            .catch(function () {
                console.log("error occur");
                $scope.error = true;
                $scope.errorMessage = 'Email already exist!';
            });
        }

        $scope.error == false;

    };
}]);
angular.module('app').controller('adminloginController',
['$scope', '$location', 'AuthService', '$route', '$window',
function ($scope, $location, AuthService,$route,$window) {
    if (AuthService.getUserInfo()){
        if (AuthService.getUserInfo().admin){
            $location.path('/admin/dashboard');
        }
    }
    // user clicks log in
    $scope.login = function () {
        $scope.error = false;
        // call login from service
        AuthService.login_admin($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {
            console.log("Admin Conneted!");
            $window.location.reload();
            $location.path('/admin/dashboard');
        })
        .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid email and/or password";
        });

    };
}]);

angular.module('app').controller('dashboardController',
  ['$scope', '$location', 'AuthService', 'UserService', '$resource', '$window',
  function ($scope, $location, AuthService,UserService,$resource,$window ) {

      $scope.user = AuthService.getUserInfo();
      console.log(AuthService.getUserInfo().username);
    // get the information for all users
     refresh = function(){
        $scope.users = UserService.getAllUsers.query(function(result){
             $scope.users=result;
        });
        //     function(users) {
        //         $scope.users = users;
        // });
     }
    refresh();
    $scope.changePermission = function(usertochange){
        UserService.changeUserPermission.save({user : usertochange.username},function(){
            refresh();
        });

        //$scope.$apply();
    };

    $scope.deleteUser = function(usertochange){
        console.log('delete clicked');
        UserService.delUser.delete({user : usertochange.username},function(){
            console.log('ok');
            refresh();
        });

        //$scope.$apply();
    };

    $scope.isCurrent = function(user){
        return user.username ==  $scope.user.username;
    };
    $scope.isAdmin = function(user){
        return user.admin == true;
    };
    $scope.tableClick = function(username) {
      $location.path('/profile/' + username);
    }
}]);
