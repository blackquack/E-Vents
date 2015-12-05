var app = angular.module('app');

app.controller('messagingController',
	['$scope', '$mdDialog', '$mdMedia', 'UserService', 'AuthService',
  	function ($scope, $mdDialog, $mdMedia, UserService, AuthService) {


  		/* FUNCTION TO SET MESSAGES */
  		setMessages = function() {
  			UserService.userMessages.get({user: AuthService.getUserInfo().username},
	  		function(msgObject) {
	  			console.log(msgObject);
	  			$scope.msgs = msgObject.messages;
	  		});
  		}

  		/* SET ALL THE MESSAGES */
  		setMessages();
		

  		/* SET THE MESSAGE BUTTON */
	    $scope.showDialog = showDialog;

	    /* MESSAGE SOMEONE BUTTON DIALOG FUNCTIONALIY*/
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
	        		setMessages();
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