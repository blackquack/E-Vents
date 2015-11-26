var app = angular.module('app');

app.controller('postingController',
  	['$scope', 'PostingService',
  	function ($scope, PostingService) {

	    $scope.games = [
		    'Dota2', 
		    'LoL', 
		    'CS:GO', 
		    'HearthStone'
		  ];

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

		  $scope.register = function() {
		 console.log("name:" + $scope.name);
		 console.log("location:" + $scope.location);
		 console.log("date:" + $scope.date);
		 console.log("cost:" + $scope.cost);
		 console.log("selection:" + $scope.selection[2]);	
		  }

		var result = PostingService.save({name:"name", location:"loc", date:"date", cost:"cost"})
		console.log(result)
	}
]);

app.factory('PostingService', ['$resource', function ($resource) {
		return $resource('/api/post/register');
}])

// app.factory('PostingService', ['$q','$http', function ($q, $http) {
//     return ({
//       	post: function login(name, loc, date, cost) {

//         	var deferred = $q.defer();

//         	$http.post('/api/post/register', {name:name, location:loc, date:date, cost:cost})
//           	.success(function (data, status) {
//             	if(status === 200 && data.status){
//               	user = username;
//               	deferred.resolve();
//             	} else {
//               	deferred.reject();
//             	}
//           	})
//           	.error(function (data) {
//             	deferred.reject();
//           	});
//         	return deferred.promise;
//       	}
//     })
// }]);
