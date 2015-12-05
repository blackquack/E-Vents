var app = angular.module('app');

app.controller('messagingController',
	['$scope', '$mdDialog', '$mdMedia', 'UserService', 'AuthService',
  	function ($scope, $mdDialog, $mdMedia, UserService, AuthService) {

  		/* SET ALL THE MESSAGES */
  		UserService.userMessages.get({user: AuthService.getUserInfo().username},
  		function(msgObject) {
  			console.log(msgObject)
  		});

  		/* FUNCTION TO SET MESSAGES */
  		setMessages = function(msgs) {

  		}
		
  		$scope.users = [1,2,4,5,6,7,8];


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
	    		from: AuthService.getUserInfo().username,
	    		to: receiver,
	    		date: new Date(),
	    		message: content
	    	})
	    }
  	}
]);