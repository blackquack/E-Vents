var app = angular.module('app');

app.controller('popularEventController',
    ['$scope', 'PostingService', '$location', 'AuthService',
    function ($scope, PostingService, $location, AuthService) {

        /* INITIALIZE USERNAME */
        USERNAME = null;
        if (AuthService.loginStatus() == true) 
            USERNAME = AuthService.getUserInfo().username;

        /* CHECK IF LOGGED IN & REDIRECT FUNCTION */
        redirectNotLogged = function() {
            if (AuthService.loginStatus() == false)
                $location.path('/register');
        }

        /* GET ALL EVENT POSTINGS */
        PostingService.allPost.query(function(events){
            console.log(events)
        })

        getPopularEvent = function(events) {
            var attendingNum = -1;
            var popularEvent = null;  

            events.forEach(function(event) {
                if (event.attendace.length > attendingNum) {
                    attendingNum = event.attendace.length
                    popularEvent = event
                }
            })

            return popularEvent   
        }
    }
]);
