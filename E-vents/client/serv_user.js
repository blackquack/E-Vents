angular.module('app').factory('UserService', 
	['$resource', function ($resource) {
	return ({
		message: $resource('/api/user/message'),
		userMessages: $resource('/api/:id/messages', {id: '@id'})
	})
}])