var app = angular.module('app');

app.controller('alleventsController',
	['$scope', 'PostingService',
  	function ($scope, PostingService) {

		/* SHOW EVENT POSTINGS */
		PostingService.allPost.query(function(result){
			// result is a list of post objects
			$scope.allEvents = result
		});
  	}
]);