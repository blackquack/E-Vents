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
