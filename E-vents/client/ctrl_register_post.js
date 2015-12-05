var app = angular.module('app');

app.controller('registerPostingController',
    ['$scope', 'PostingService', '$location', 'AuthService',
    function ($scope, PostingService, $location, AuthService) {

        /* GAMES */
        $scope.games = [
            'Dota2',
            'LoL',
            'CS:GO',
            'HearthStone'
        ];

        /* DATE */
        $scope.date = new Date();

        $scope.minDate = new Date(
            $scope.date.getFullYear(),
            $scope.date.getMonth(),
            $scope.date.getDate()
        );

        /* COST */
        $scope.cost = 0;
        $scope.filterValue = function($event){
            if(isNaN(String.fromCharCode($event.keyCode))){
                $event.preventDefault();
            }
        };

        /* GAMES */
        $scope.selected = [];
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        
        /* REGISTER BUTTON */
        $scope.register = function() {
            $scope.form = {};

            if (checkFormBad() == true)
            return;

            var result = PostingService.register.save({
                name: $scope.name,
                description: $scope.description,
                location: $scope.address + ', ' + $scope.city,
                date: $scope.date,
                cost:$scope.cost,
                games: $scope.selected,
                creator: AuthService.getUserInfo._id
            })

            $location.path('/');
        }

        checkFormBad = function() {
            var badForm = false;
            if ($scope.name == undefined || $scope.name == "") {
                $scope.form["name"] = true;
                badForm = true;
            }
            if ($scope.address == undefined || $scope.address == "") {
                $scope.form["address"] = true;
                badForm = true;
            }
            if ($scope.city == undefined || $scope.city == "") {
                $scope.form["city"] = true;
                badForm = true;
            }
            return badForm;
        }
    }
]);
