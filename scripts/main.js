(function() {
  "use strict";
  angular.module("myApp", [ "ngRoute", "mgcrea.ngStrap", "ui.utils" ])
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "views/home.html"
    })
    .when("/physearch", {
      templateUrl: "views/physearch.html",
      controller: "PhysicianSearchController",
      controllerAs: "PHYSC"
    })
    .when("/physearch/:physician_id", {
      templateUrl: "views/physician.html",
      controller: "PhysicianController",
      controllerAs: "PHYSC"
    })
    .when("/rxsearch", {
      templateUrl: "views/rxsearch.html",
      controller: "RxSearchController",
      controllerAs: "RxSC"
    })
    .when("/rxsearch/:ndc_of_associated_covered_drug_or_biological1", {
      templateUrl: "views/rxsearchNDC.html",
      controller: "RxSearchController",
      controllerAs: "RxSC"
    })
    .otherwise({ redirectTo: "/" });
  })
  .controller("FDACallController", function($http) {
    var a = this,
    url = "https://api.fda.gov/drug/event.json?api_key=Xgd5lx8BAGRQThoeLjBRWRApQZxr6o9Qh87R3rbU&search=";
    $http.get(url + "patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact" )
    .success(function(data) {
      a.FDA = data.results;
      console.log(a.FDA);
    })
    .error(function(err) {
      console.log(err);
    })
  })
  .controller("RxSearchController", function($http, $routeParams, $scope) {
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
  })
  .controller("FDABrandController", function($http) {
    var a = this,
    url = "https://api.fda.gov/drug/event.json?api_key=Xgd5lx8BAGRQThoeLjBRWRApQZxr6o9Qh87R3rbU&search=";
    $http.get(url + "patient.drug.openfda.brand_name:\"tylenol\"&count=patient.reaction.reactionmeddrapt.exact")
    .success(function(data) {
      a.FDAB = data.results;
      console.log(a.FDAB);
    })
    .error(function(err) {
      console.log(err);
    })
  })
}());
