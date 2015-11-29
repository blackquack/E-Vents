angular.module('app').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in controllers
    return ({
      getUser: function getUser() {
        return user;
      },
      
      login: function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/auth/login', {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              user = username;
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
      logout: function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/auth/logout')
          // handle success
          .success(function (data) {
            user = null;
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = null;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },
      register: function register(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/auth/register', {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
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

angular.module('app').factory('UserService',
  ['$q', '$location', '$http',
  function ($q, $location, $http) {

    /* return available functions for use in controllers */
    return ({
      /* update a a user's profile info */
      updateUser: function updateUser(username, displayName, description) {

        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.put('/user/' + username, {displayName: displayName, description: description })
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }          
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        return deferred.promise;

      },

      /* update a user's type. regualar/admin/s.admin */
      updateUserType: function updateUserType(username, type) {

        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.put('/user/type/' + username, {type: type})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }          
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        return deferred.promise;

      },

      /* update a user's behaviour data */
      updateUserBehaviour: function updateUserBehaviour(username, pages, location) {

        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.put('/user/behaviour/' + username, {pages: pages, location: location})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }          
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        return deferred.promise;

      },

      // get all users
      getAllUsers: function getAllUsers() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.get('/user/all')
          // handle success
          .success(function (data) {
            deferred.resolve(data);
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },

      // get user with given username
      getUser: function getUser(username) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.get('/user/' + username)
          // handle success
          .success(function (data) {
            deferred.resolve(data);
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },

      // delete a user with given username
      deleteUser: function deleteUser(username) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.delete('/user/' + username)
          // handle success
          .success(function (data) {
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