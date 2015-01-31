(function() {
  "use strict";
  PromiseController.$inject = [ "$http", "$q" ];
  function PromiseController($http, $q) {
    var a = this,
    url = "http://rxnav.nlm.nih.gov/REST/rxclass/class/byRxcui.json?rxcui=",
    rxcui = 69120,
    greet = "Yes you fucking idiot";
    a.testPromise = function(url, rxcui, greet) {
      return $q(function(res, rej) {
        $http.get("http://rxnav.nlm.nih.gov/REST/rxclass/class/byRxcui.json?rxcui=6912045678hhjk")
        .then(function(data) {
          res(console.log(data));
        })
        .then(function() {
          res(alert(greet))
        })
        .catch(function(err) {
          rej(console.log(err));
        })
      })
    }
    a.testPromise();
  }
  angular.module("myApp")
  .controller("PromiseController", PromiseController)
}());
