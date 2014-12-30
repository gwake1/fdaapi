(function() {
  "use strict";
  PhysicianSearchController.$inject = [ "$scope", "$http", "$location" ];
  function PhysicianSearchController($scope, $http, $location) {
    this.specialityOptions1 = {
      "Allopathic & Osteopathic Physicians/ Family Medicine": "Family Practice",
      "Allopathic & Osteopathic Physicians/ Internal Medicine": "Internal Medicine",
      "Allopathic & Osteopathic Physicians/ Pediatrics": "Pediatrics"
    }
    var a = this;
    this.searchPhysician = function() {
      var url = "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?",
      phyFirstName = this.phy.firstName ? "physician_profile_first_name=" + this.phy.firstName + "&" : "",
      phyLastName = this.phy.lastName ? "physician_profile_last_name=" + this.phy.lastName + "&" : "",
      phyCity = this.phy.city ? "physician_profile_city=" + this.phy.city + "&" : "",
      phyState = this.phy.state ? "physician_profile_state=" + this.phy.state : "",
      phySpeciality = this.phy.speciality ? "&physician_speciality=" + this.phy.speciality + "&" : "";
      $http.get(url + phyFirstName + phyLastName + phyCity + phyState + phySpeciality)
      .success(function(data) {
        a.provider = data;
        console.log(a.provider)
      })
      .error(function(err) {
        console.log(err);
      })
    }
    this.goToPhysician = function(physician_id) {
      $location.path("/physearch/" + physician_id)
    }
  }
  angular.module("myApp")
  .controller("PhysicianSearchController", PhysicianSearchController)
}());
