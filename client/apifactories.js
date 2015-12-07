var app = angular.module('app');

angular.module('app').factory('UserService',
	['$resource', function ($resource) {
	return ({
		message: 		$resource('/api/user/message'),
		userMessages: 	$resource('/api/user/:user/messages', {user: '@user'}),
		getUser: 		$resource('/api/user/:user', {user: '@user'}),
		getAllUsers:    $resource('/api/user/all'),
		getEvents:		$resource('/api/user/:user/attendance', {user: '@user'}),
		editUser:		$resource('/api/user/edit')
	})
}])

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