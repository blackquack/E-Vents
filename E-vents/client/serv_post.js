angular.module('app').factory('PostingService', 
	['$resource', function ($resource) {
	return ({
		register: $resource('/api/post/register'),
		allPost: $resource('/api/post/all'),
		postID: $resource('/api/post/:id', {id: '@id'}),
		like: $resource('/api/post/like'),
		unLike: $resource('/api/post/unlike'),
		comment: $resource('/api/post/comment')
	})
}])