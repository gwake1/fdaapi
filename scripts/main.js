(function() {
  "use strict";
  angular.module("myApp", [ "ngRoute", "mgcrea.ngStrap" ] )
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "views/home.html"
    })
    .when("/physearch", {
      templateUrl: "views/physearch.html",
      controller: "PhysicianSearchController",
      controllerAs: "PHYC"
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
  .controller("PhysicianController", function($http, $routeParams) {
    var a = this,
    physician_id = $routeParams.physician_id;
    $http.get("https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?physician_id=" + physician_id)
    .success(function(data) {
      a.Physician = data[0];
      console.log(a.Physician)
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
  .controller("PhysicianSearchController", function($http, $rootScope) {
    var a = this,
    phy = {},
    specialtyOptions = {
      familyPractice: "Allopathic & Osteopathic Physicians/ Family Medicine"
    };
    a.searchPhysician = function() {
      var url = "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?",
      phyFirstName = "physician_profile_first_name=" + phy.firstName,
      phyLastName = "&physician_profile_last_name=" + phy.lastName;
      $http.get(url + phyFirstName + phyLastName)
      .success(function(data) {
        a.Provider = data;
        console.log(a.Provider)
      })
      .error(function(err) {
        console.log(err);
      })
    }
    a.inspectPhysician = function(physician_id){
      var url =   $http.get("https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?physician_id="+physician_id)
      .success(function(data) {
        a.Physician = data;
        console.log(a.Physician)
      })
      .error(function(err) {
        console.log(err)
      })
    }
  })
}());
