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
    physician_id = $routeParams.physician_id,
    url = "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?physician_id=";

    a.filters = {};

    $http.get(url + physician_id)
    .success(function(data) {
      a.Physician = data[0];
      a.generalPaymentData();
    })
    .error(function(err) {
      console.log(err)
    })
    a.phyGenTotalPMT = function(phy) {
      var a = this;
      a.phyGenPMTTotal = 0;
      $(phy).each(function(index) {
      a.phyGenPMTTotal = a.phyGenPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
    a.generalPaymentData = function() {
      var a = this,
      url = "https://openpaymentsdata.cms.gov/resource/identified-general-payments-2013.json?physician_profile_id=",
      phyProfileId = a.Physician.physician_profile_id;
      $http.get(url + phyProfileId)
      .success(function(data) {
        a.genPMTData = data;
        a.phyGenTotalPMT(a.genPMTData)
        console.log(a.genPMTData);
      })
      .error(function(err) {
        console.log(err)
      })
    }
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
  .controller("PhysicianSearchController", function($http) {
    var a = this;

    a.specialityOptions1 = {
      "Allopathic & Osteopathic Physicians/ Family Medicine": "Family Practice",
      "Allopathic & Osteopathic Physicians/ Internal Medicine": "Internal Medicine",
      "Allopathic & Osteopathic Physicians/ Pediatrics": "Pediatrics"
    };
    a.searchPhysician = function() {
      var url = "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?",
      phyFirstName = a.phy.firstName ? "physician_profile_first_name=" + a.phy.firstName + "&" : "",
      phyLastName = a.phy.lastName ? "physician_profile_last_name=" + a.phy.lastName + "&" : "",
      phyCity = a.phy.city ? "physician_profile_city=" + a.phy.city + "&" : "",
      phyState = a.phy.state ? "physician_profile_state=" + a.phy.state : "",
      phySpeciality = a.phy.speciality ? "&physician_speciality=" + a.phy.speciality + "&" : "";
      $http.get(url + phyFirstName + phyLastName + phyCity + phyState + phySpeciality)
      .success(function(data) {
        a.Provider = data;
        console.log(a.Provider)
      })
      .error(function(err) {
        console.log(err);
      })
    }
    // a.inspectPhysician = function(physician_id){
    //   var url =   $http.get("https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?physician_id="+physician_id)
    //   .success(function(data) {
    //     a.Physician = data;
    //     console.log(a.Physician)
    //   })
    //   .error(function(err) {
    //     console.log(err)
    //   })
    // }
  })
}());
