angular.module('app').factory('AuthService',
  ['$q', '$timeout', '$http','$window','$interval', '$route',
  function ($q, $timeout, $http,$window,$interval,resources,$route) {

    // create user variable
    var user = null;
    var logged = false;
    // return available functions for use in controllers
    return ({

      loginStatus : function loginStatus(){
          if (window.user){
            logged = true;
          }
          return logged;
      }
      ,
      getUser: function getUser() {
        return user;
      },
      getUserInfo : function getUserInfo(){

          userinfo = window.user;
          if (userinfo){
            logged = true;
          }
          return userinfo;

      },

      login: function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/auth/login', {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200){
              //user = data.user.name;
              //console.log(data);
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },

      login_twitter : function login_twitter(){
          var deferred = $q.defer();
          console.log("clicked");
          window.location = 'auth/twitter';
          // $http.get('/auth/success')
          // .success(function (data) {
          //   console.log(data);
          //   if(!(data.user == null)){
          //     console.log(data);
          //     user = data.user.name;
          //
          //     deferred.resolve();
          //   }
          //   else{
          //     var popup = $window.open('auth/twitter', '', "top=100,left=100,width=500,height=500");
          //     console.log(popup.document.body);
          //     //deferred.reject();
          //   }
          // })
          // // handle error
          // .error(function (data) {
          //
          //   user = null;
          //   deferred.reject();
          // });
          deferred.reject();

          return deferred.promise;

      },
      logout: function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/auth/logout')
          // handle success
          .success(function (data) {
            user = null;
            logged = false;
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = null;
            ogged = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },
      register: function register(username, password ,name) {

        // create a new instance of deferred
        var deferred = $q.defer();
        console.log({username: username,password:password, name:name});
        // send a post request to the server
        $http.post('/auth/register', {username: username, password: password, name:name})
          // handle success
          .success(function (data, status) {
            console.log(data);
            console.log(status);
            if(status === 200 && data.state== "success"){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },
      changePassword: function changePassword(username, password, newPassword) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/auth/changepass', {username: username, password: password, newPassword: newPassword})
          // handle success
          .success(function (data, status) {
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }
    });
}]);
