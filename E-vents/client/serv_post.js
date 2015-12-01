angular.module('app').factory('PostingService', 
	['$resource', function ($resource) {
	return ({
		register: $resource('/api/post/register'),
		allPost: $resource('/api/post/all')
	})
}])