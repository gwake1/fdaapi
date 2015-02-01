(function() {
  "use strict";
  AuthController.$inject = [ "$http", "$routeParams" ];
  function AuthController(firebase, $http, $routeParams) {
    var a = this,
    ref = new Firebase("https://docinthelobbyauth.firebaseio.com");
    function authDataCallback(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        console.log("User is logged out");
      }
    }
    ref.onAuth(authDataCallback);
  }
  angular.module("myApp")
  .controller("AuthController", AuthController)
}());
