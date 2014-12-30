(function() {
  "use strict";
  RxSearchController.$inject = [ "$http", "$routeParams", "$scope" ];
  function RxSearchController($http, $routeParams, $scope) {
    var a = this,
    NDC = $routeParams.ndc_of_associated_covered_drug_or_biological1 + ".json",
    url = "https://ndcdatareturn.firebaseio.com/data/";
    $http.get(url + NDC)
    .success(function(data) {
      console.log(data)
    })
    .error(function(err) {
      console.log(err)
    })
  }
  angular.module("myApp")
  .controller("RxSearchController", RxSearchController)
}());
