var app = angular.module('app');

app.controller('eventController',
	['$scope', 'PostingService', '$routeParams', '$location',
  	function ($scope, PostingService, $routeParams, $location) {

  		/* make a api call to get post using id from URL*/
		PostingService.postID.get({id: $routeParams.id}, 
		function(result){
			setPost(result)
		}, 
		function(error){
			$location.path('/')
		});

		/* FUNCTION TO INITIALIZE */
		setPost = function(post) {
			$scope.cost = post.cost
			if ($scope.cost == 0) $scope.cost = 'FREE'
			$scope.name = post.name
			$scope.description = post.description
			$scope.likes = post.likes
			$scope.comments = post.comments
			$scope.attendance = post.attendance
		}

		/* LIKE BUTTON */
		$scope.likeText = 'like'
		$scope.like = function() {
			if ($scope.likeText == 'like') {
				like()
			}
			else {
				unlike()
			}
		}

		like = function() {
			PostingService.like.save({
				id: $routeParams.id
			})
			$scope.likeText = 'unlike'
			$scope.likes++
		}

		unlike = function() {
			PostingService.unLike.save({
				id: $routeParams.id
			})
			$scope.likeText = 'like'
			$scope.likes--
		}

		/* COMMENTING */
		$scope.comment = function() {
			if ($scope.inputComment == undefined || $scope.inputComment == "") return

			PostingService.comment.save({
				id: $routeParams.id,
				user: 'username',
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