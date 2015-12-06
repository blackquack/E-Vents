var app = angular.module('app');

app.controller('eventController',
	['$scope', 'PostingService', '$routeParams', '$location', 'AuthService',
  	function ($scope, PostingService, $routeParams, $location, AuthService) {

  		/* CHECK IF LOGGED IN */
    	if (AuthService.loginStatus() == false) {
        	$location.path('/register')
        	return
    	}

  		/* GET POST USING ID FROM URL*/
		PostingService.postID.get({id: $routeParams.id}, 
		function(result){
			setPost(result)
		}, 
		function(error){
			$location.path('/')
		});

		USERNAME = AuthService.getUserInfo().username;

		/* FUNCTION TO INITIALIZE */
		setPost = function(post) {
			$scope.cost = post.cost
			if ($scope.cost == 0) $scope.cost = 'FREE'
			$scope.name = post.name
			$scope.description = post.description
			$scope.likes = post.likes
			$scope.comments = post.comments
			$scope.attendance = post.attendance
			$scope.buttonName = setButtonName(post)
			$scope.eventClick = setEventClick(post)
		}


		/* SET BUTTON NAME FUNCTION */
		setButtonName = function(event) {
			if (event.attendance.indexOf(USERNAME) > -1)
				return "UNJOIN"
			return "JOIN"
		}

		/* SET EVENT BUTTON FUNCTIONALITY */
		setEventClick = function(event) {

			// in the event already, no api to remove
			if (event.attendance.indexOf(USERNAME) > -1)
				return
			PostingService.joinEvent.save({id:event._id, user:USERNAME})	
		}

		/* LIKE BUTTON */
		$scope.likeText = 'Like'
		$scope.like = function() {
			if ($scope.likeText == 'Like') {
				like()
			}
			else {
				unlike()
			}
		}

		like = function() {
			PostingService.like.save({
				id: $routeParams.id,
				user: USERNAME
			})
			$scope.likeText = 'Unlike'
			$scope.likes++
		}

		unlike = function() {
			PostingService.unLike.save({
				id: $routeParams.id,
				user: USERNAME
			})
			$scope.likeText = 'Like'
			$scope.likes--
		}

		/* COMMENTING */
		$scope.comment = function() {
			if ($scope.inputComment == undefined || $scope.inputComment == "") return

			PostingService.comment.save({
				id: $routeParams.id,
				user: USERNAME,
				comment: $scope.inputComment
			}, 
			function(success) {
				refreshComments()
			})
		}

		refreshComments = function() {
			PostingService.postID.get({id: $routeParams.id}, function(result){
				$scope.comments = result.comments
			})
		}

  	}
]);