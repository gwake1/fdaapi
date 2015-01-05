(function() {
  "use strict";
  RxSearchController.$inject = [ "$http", "$routeParams", "RxSearchFactory" ];
  function RxSearchController($http, $routeParams, RxSearchFactory) {
    var a = this;
    RxSearchFactory.getRx(function(data) {
      a.Rx = data;
      console.log(a.Rx)
    })
  }
  angular.module("myApp")
  .controller("RxSearchController", RxSearchController)
}());
