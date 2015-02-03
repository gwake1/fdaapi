(function() {
  "use strict";
  AuthController.$inject = [ "$http", "$routeParams" ];
  function AuthController(firebase, $http, $routeParams) {
    var a = this,
    ref = new Firebase("https://docinthelobbyauth.firebaseio.com");
    function authHandler(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    }
    ref.authWithPassword({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, authHandler);
    ref.onAuth(function(data) {
      console.log(data);
    });
  }
  angular.module("myApp")
  .controller("AuthController", AuthController)
}());
