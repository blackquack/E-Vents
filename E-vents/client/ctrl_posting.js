var app = angular.module('app');

app.controller('postingController',
  	['$scope', 'PostingService',
  	function ($scope, PostingService) {

  		/* GAMES */
	    $scope.games = [
		    'Dota2', 
		    'LoL', 
		    'CS:GO', 
		    'HearthStone'
		];

		/* LOCATIONS */
		$scope.locations = [
			'Toronto',
			'Montreal',
			'Ottawa',
			'New York'
		];

		$scope.location = $scope.locations[0]; //default value
		$scope.locSelect = function(loc) {
			$scope.location = loc;
		}

		/* DATE */
  		$scope.date = new Date();

		$scope.minDate = new Date(
	      	$scope.date.getFullYear(),
	      	$scope.date.getMonth(),
	      	$scope.date.getDate()
	    );

		/* GAMES CHECKBOX FUNCTIONALIY */
	    $scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        	}
		};

	  	$scope.selection = [];
	  		$scope.toggleSelection = function toggleSelection(game) {
	    	var idx = $scope.selection.indexOf(game);

	    	// is currently selected
	   	 	if (idx > -1) {
	      		$scope.selection.splice(idx, 1);
	    	}

	    	// is newly selected
	    	else {
	      		$scope.selection.push(game);
	    	}
		};

		/* REGISTER BUTTON */
		$scope.register = function() {
		 	var result = PostingService.register.save({
				name: $scope.name, 
				location: $scope.location, 
				date: $scope.date,
				cost:$scope.cost
			})
		}


		/* SHOW EVENT POSTINGS */
		PostingService.allPost.query(function(result){
			$scope.events = result
		});



	}
]);

app.factory('PostingService', ['$resource', function ($resource) {
	return ({
		register: $resource('/api/post/register'),
		allPost: $resource('/api/post/all')
	})
	
        	//return $resource('/api/post/register');

}])