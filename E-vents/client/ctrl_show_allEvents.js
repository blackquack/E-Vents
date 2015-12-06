var app = angular.module('app');

app.controller('alleventsController',
	['$scope', 'PostingService', 'AuthService', '$location', '$routeParams', 'UserService',
  	function ($scope, PostingService, AuthService, $location, $routeParams, UserService) {

  		/* INITIALIZE USERNAME */
  		USERNAME = null;
  		if (AuthService.loginStatus() == true) 
  			USERNAME = AuthService.getUserInfo().username;

  		/* CHECK IF LOGGED IN & REDIRECT FUNCTION */
        redirectNotLogged = function() {
        	if (AuthService.loginStatus() == false)
            	$location.path('/register');
        }


 		/* SHOW ALL EVENT POSTINGS TYPE BASE ON URL */
		if ($routeParams.type == 'all') {
			PostingService.allPost.query(function(result){
				$scope.allEvents = result;
			});
		} 
		else if ($routeParams.type == 'lol') {
		 	PostingService.gamePosts.query({game: "League of Legends"}, 
			function(result){
				$scope.allEvents = result;
			})
		}
		else if ($routeParams.type == 'dota2') {
		 	PostingService.gamePosts.query({game: "DOTA2"}, 
			function(result){
				$scope.allEvents = result;
			})
		}
		else if ($routeParams.type == 'csgo') {
		 	PostingService.gamePosts.query({game: "CS:GO"}, 
			function(result){
				$scope.allEvents = result;
			})
		}
		else if ($routeParams.type == 'hearthstone') {
		 	PostingService.gamePosts.query({game: "Hearthstone"}, 
			function(result){
				$scope.allEvents = result;
			})
		}
		else {
			$location.path('/')
		}


		/* SET BUTTON NAME FUNCTION */
		$scope.userJoined = function(event) {
			if (event.attendance.indexOf(USERNAME) > -1)
				return true
			return false
		}

		/* SET BUTTON FUNCTIONALITY */
		$scope.eventClick = function(event) {
			redirectNotLogged();

			if (USERNAME != null) {
				// in the event already, no api to remove
				if (event.attendance.indexOf(USERNAME) > -1)
					return

				// join the event
				PostingService.joinEvent.save({id:event._id, user:USERNAME})
				// also update locally
				event.attendance.push(USERNAME)
			}
		}

		/* SET COST NAME FUNCTION */
		$scope.costName = function(cost) {
			if (cost == 0)
				return 'FREE'
			return '$' + cost
		}


		/* SET LIKE NAME FUNCTION */
		$scope.likeText = function(event) {
			
			// no logged in user, initial value
			if (event.likeText == null && USERNAME == null) {
				event.likeText = 'Like'
				return 'Like'
			}
			// logged in user, initial value
			if (event.likeText == null && USERNAME != null) {
				if (AuthService.getUserInfo().likes.indexOf(event._id) > -1) {
					event.likeText = 'Unlike'
					return 'Unlike'
				}
				event.likeText = 'Like'
				return 'Like'
			}

			return event.likeText
		}

		/* LIKE BUTTON */
		$scope.like = function(event) {
			redirectNotLogged();
				
			if (USERNAME != null) {
				if (event.likeText == 'Like') {
					like(event)
				}
				else {
					unlike(event)
				}
			}
		}

		like = function(event) {
			PostingService.like.save({
				id: event._id,
				user: USERNAME
			})
			event.likeText = 'Unlike'
			event.likes++
		}

		unlike = function(event) {
			PostingService.unLike.save({
				id: event._id,
				user: USERNAME
			})
			event.likeText = 'Like'
			event.likes--
		}
  	}
]);