var app = angular.module('app');

app.controller('querygameController',
	['$scope', 'PostingService', '$routeParams',
  	function ($scope, PostingService, $routeParams) {
  		PostingService.game.query({game: $routeParams.game},
  		function(result){
  			$scope.allEvents = result;
  		});
  	}
]);