var app = angular.module('app');

app.controller('popularEventController',
    ['$scope', 'PostingService', '$location', 'AuthService', 'UserService',
    function ($scope, PostingService, $location, AuthService, UserService) {

        /* INITIALIZE USERNAME */
        USERNAME = null;
        if (AuthService.loginStatus() == true) 
            USERNAME = AuthService.getUserInfo().username;


        /* FUNCTION TO CHECK IF LOGGED IN & REDIRECT */
        redirectNotLogged = function() {
            if (AuthService.loginStatus() == false)
                $location.path('/register');
        }


        /* GET ALL EVENT POSTINGS & SET MOST POPULAR*/
        setMostPopular = function() {
            PostingService.allPost.query(function(events){
                var popularEvent = getPopularEvent(events)
                setPopularEvent(popularEvent)
            })
        }

        /* GET THE MOST POPULAR EVENT BASE ON ATTENDANCE */
        getPopularEvent = function(events) {
            var attendingNum = -1;
            var popularEvent = null;  

            events.forEach(function(event) {
                if (event.attendance.length > attendingNum) {
                    attendingNum = event.attendance.length
                    popularEvent = event
                }
            })

            return popularEvent   
        }

        /* INITIALIZE VALUES ONTO HTML */
        setPopularEvent = function(event) {
            $scope.name = event.name
            $scope.location = event.location
            $scope.date = event.date.substring(0,10)
            $scope.description = event.description
            $scope.attending = event.attendance.length
            $scope.attendance = event.attendance
            $scope.likes = event.likes
            $scope.likeText = setLikeText(event)
            $scope.eventID = event._id
            if (event.attendance.indexOf(USERNAME) > -1) {
                $scope.userJoined = true 
            } else {
                $scope.userJoined = false
            }
        }


        var userLikes

        /* GET UPDATED VERSION OF USER */
        if (USERNAME != null) {
            UserService.getUser.get({user:USERNAME}, 
            function(user){
                userLikes = user.likes
                setMostPopular();
            })
        }
        else {
            setMostPopular();
        }



        /* SET JOIN BUTTON FUNCTIONALITY */
        $scope.joinClick = function() {
            redirectNotLogged();

            if (USERNAME != null) {
                // in the event already, no api to remove
                if ($scope.attendance.indexOf(USERNAME) > -1)
                    return

                // join the event
                PostingService.joinEvent.save({id:$scope.eventID, user:USERNAME})
                // also update locally
                $scope.attending++
                $scope.userJoined = true;
            }
        }



        /* SET LIKE BUTTON INITIAL TEXT */
        setLikeText = function(event) {
            if (USERNAME == null) return 'Like';
            if (userLikes.indexOf(event._id) > -1) {
                return 'Unlike'
            } else {
                return 'Like'
            }
        }

        /* LIKE BUTTON */
        $scope.like = function() {
            redirectNotLogged()
            if (USERNAME == null) return
            if ($scope.likeText == 'Like') {
                like()
            }
            else {
                unlike()
            }
        }

        like = function() {
            PostingService.like.save({
                id: $scope.eventID,
                user: USERNAME
            })
            $scope.likeText = 'Unlike'
            $scope.likes++
        }

        unlike = function() {
            PostingService.unLike.save({
                id: $scope.eventID,
                user: USERNAME
            })
            $scope.likeText = 'Like'
            $scope.likes--
        }
    }
]);
