angular.module('app').factory('PostingService', 
	['$resource', function ($resource) {
	return ({
		register: 	$resource('/api/post/register'),
		allPost: 	$resource('/api/post/all'),
		postID: 	$resource('/api/post/:id', {id: '@id'}),
		postName: 	$resource('/api/post/name/:name', {name: '@name'}),
		like: 		$resource('/api/post/like'),
		unLike: 	$resource('/api/post/unlike'),
		comment: 	$resource('/api/post/comment'),
		gamePosts: 	$resource('/api/post/game/:game', {game: '@game'}),
		joinEvent: 	$resource('/api/post/join')
	})
}])

