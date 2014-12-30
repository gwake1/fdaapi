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
}());
