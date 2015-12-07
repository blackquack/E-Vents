var app = angular.module('app');

app.controller('eventController',
	['$scope', 'PostingService', '$routeParams', '$location', 'AuthService', 'UserService',
  	function ($scope, PostingService, $routeParams, $location, AuthService, UserService) {

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
		$scope.testt = AuthService.getUserInfo().username;

		/* FUNCTION TO INITIALIZE */
		setPost = function(post) {
			$scope.cost = post.cost
			if ($scope.cost == 0) {
				$scope.cost = 'FREE'
			}
			else{
				$scope.cost = "$" + $scope.cost 
			}
			$scope.name = post.name
			$scope.description = post.description
			$scope.likes = post.likes
			setLikeText(post)
			$scope.comments = post.comments
			$scope.attendance = post.attendance
			$scope.userJoined = userJoined(post)
			$scope.eventClick = setEventClick(post)
		}


		/* SET BUTTON NAME FUNCTION */
		userJoined = function(event) {
			if (event.attendance.indexOf(USERNAME) > -1)
				return true
			return false
		}

		/* SET EVENT BUTTON FUNCTIONALITY */
		setEventClick = function(event) {

			// in the event already, no api to remove
			if (event.attendance.indexOf(USERNAME) > -1)
				return
			PostingService.joinEvent.save({id:event._id, user:USERNAME})	
		}

		/* SET LIKE BUTTON INITIAL TEXT */
		setLikeText = function(event) {
			UserService.getUser.get({user:USERNAME}, 
			function(user){
				if (user.likes.indexOf(event._id) > -1) {
					$scope.likeText = 'Unlike'
				} else {
					$scope.likeText = 'Like'
				}
			})			
		}

		/* LIKE BUTTON */
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