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
    .when("/rxsearch/:applicable_manufacturer_or_applicable_gpo_making_payment_id", {
      templateUrl: "views/rxco.html",
      controller: "RxCompanyController",
      controllerAs: "RxCo"
    })  .when("/rxsearch/:applicable_manufacturer_or_applicable_gpo_making_payment_id/:name_of_associated_covered_drug_or_biological1", {
      templateUrl: "views/rxsearchNDC.html",
      controller: "RxController",
      controllerAs: "Rx"
    })
    .when("/chart", {
      templateUrl: "views/chart.html",
      controller: "chart"
    })
    .when("/promise", {
      templateUrl: "views/promise.html",
      controller: "PromiseController"
    })
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "AuthController"
    })
    .otherwise({ redirectTo: "/" });
  })
}());
