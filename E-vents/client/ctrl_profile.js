angular.module('app').controller('profileController',
['$scope', '$location', 'AuthService', '$routeParams', 'UserService',
function ($scope, $location, AuthService, $routeParams, UserService) {
    $scope.user = AuthService.getUserInfo();
    $scope.greet = "Profile Page";

    UserService.getEvents.get({user: $routeParams.username}, 
    function(result){
        $scope.events = result.attendance;
    });

}]);

angular.module('app').controller('myprofileController',
['$scope', '$location', 'AuthService', 'UserService',
function ($scope, $location, AuthService, UserService) {
    $scope.user = AuthService.getUserInfo();
    $scope.greet = "Profile Page";

    UserService.getEvents.get({user: AuthService.getUserInfo().username}, 
    function(result){
        $scope.events = result.attendance;
    });

}]);