var app = angular.module('app');

app.controller('homeController',
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


        var userLikes

        /* GET UPDATED VERSION OF USER */
        UserService.getUser.get({user:USERNAME}, 
        function(user){
            userLikes = user.likes
            checkAndSet();
        })  

        /* MAIN EVENT VALUES */
        EVENT_OF_DAY = 'League of Legends LAN Tournament'
        EVENT_OF_DAY_DESC = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        EVENT_OF_DAY_LOC = '40 St. George, Toronto'

        /* FUNCTION TO CHECK IF EVENT WAS CREATED AND SET HOMEPAGE */
        checkAndSet = function() {    
            PostingService.postName.query({name: EVENT_OF_DAY},
            function(post) {
                if (post.length > 0) {
                    setHomePage(post[0])
                } else {
                    createEventOfDay();
                }
            })
        }

        /* CREATE EVENT FUNCTION */
        createEventOfDay = function() {
            PostingService.register.save({
                name: EVENT_OF_DAY,
                description: EVENT_OF_DAY_DESC,
                location: EVENT_OF_DAY_LOC,
                date: Date(),
                cost: 0,
                games: ['League of Legends'],
                creator: 'admin520'
            },
            function(event){
                setHomePage(event)
            })
        }

        /* SET HOME PAGE FUNCTION */
        setHomePage = function(event) {
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
            if (USERNAME == null) return;
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
