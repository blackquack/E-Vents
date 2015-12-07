angular.module('app').controller('profileController',
['$scope', '$location', 'AuthService', '$routeParams', 'UserService', '$mdDialog', '$mdMedia', 'UserService',
function ($scope, $location, AuthService, $routeParams, UserService, $mdDialog, $mdMedia, UserService) {
    

    UserService.getUser.get({user: $routeParams.username}, 
        function(user){
            $scope.user = user.username
            if (user.name != null) $scope.user = user.name
    })
    $scope.greet = "Profile Page";

    /* GOTO HOME IF NO USER EXIST, ALSO SET EVENTS */
    UserService.getEvents.get({user: $routeParams.username}, 
    function(result){
        if (result._id == null) $location.path('/')
        $scope.events = result.attendance;
    });


    /* SET THE MESSAGE BUTTON */
    $scope.showDialog = showDialog;

    /* MESSAGE SOMEONE BUTTON DIALOG FUNCTIONALIY*/
    function showDialog($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl: "views/dialog.html",
            controller: DialogController
        });

        function DialogController($scope, $mdDialog) {
            $scope.receiver = $routeParams.username

            $scope.cancel = function() {
                $mdDialog.hide();
            }

            $scope.send = function() {
                if ($scope.receiver == null || $scope.receiver == '') return
                if ($scope.content == null || $scope.content == '') return

                sendMessage($scope.receiver, $scope.content)
                $mdDialog.hide();
            }

        }
    }

    /* SEND BUTTON FUNCTION  */
    sendMessage = function(receiver, content) {
        UserService.message.save({
            from: AuthService.getUserInfo().username,
            to: receiver,
            date: new Date(),
            message: content
        })
    }

}]);

angular.module('app').controller('myprofileController',
['$scope', '$location', 'AuthService', 'UserService',
function ($scope, $location, AuthService, UserService) {

    $scope.username = AuthService.getUserInfo().username
    if (AuthService.getUserInfo().name != null) $scope.name = AuthService.getUserInfo().name
    $scope.user = AuthService.getUserInfo();
    $scope.greet = "Profile Page";

    UserService.getEvents.get({user: AuthService.getUserInfo().username}, 
    function(result){
        $scope.events = result.attendance;
    });

}]);