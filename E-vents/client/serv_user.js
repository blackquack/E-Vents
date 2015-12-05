angular.module('app').factory('UserService', 
	['$resource', function ($resource) {
	return ({
		message: $resource('/api/user/message'),
		userMessages: $resource('/api/user/:user/messages', {user: '@user'})
	})
}])