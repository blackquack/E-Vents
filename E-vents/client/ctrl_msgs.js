var app = angular.module('app');

app.controller('messagingController',
	['$scope', '$mdDialog', '$mdMedia', 'UserService',
  	function ($scope, $mdDialog, $mdMedia, UserService) {

  		USER =  "username";

  		/* SET ALL THE MESSAGES */
  		UserService.userMessages.query({id: USER},
  		function(result) {
  			console.log(result)
  		});
		

		setMessages = function () {

		}


		USER = 'username';



	    $scope.showDialog = showDialog;

	    /* MESSAGE SOMEONE BUTTON */
		function showDialog($event) {
	       	var parentEl = angular.element(document.body);
	       	$mdDialog.show({
		        parent: parentEl,
		        targetEvent: $event,
		        templateUrl: "views/dialog.html",
	         	controller: DialogController
	      	});

	      	function DialogController($scope, $mdDialog) {
	        	$scope.cancel = function() {
	          		$mdDialog.hide();
	        	}

	        	$scope.send = function() {
	        		if ($scope.receiver == null || $scope.receiver == '') return
	        		if ($scope.content == null || $scope.content == '') return

	        		sendMessage($scope.receiver, $scope.content)
	        		$mdDialog.hide();
	        	}


	      	}
	    }

	    /* SEND BUTTON FUNCTION  */
	    sendMessage = function(receiver, content) {
	    	UserService.message.save({
	    		from: USER,
	    		to: receiver,
	    		date: new Date(),
	    		message: content
	    	})
	    }
  	}
]);