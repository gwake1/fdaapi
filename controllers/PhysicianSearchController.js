(function() {
  "use strict";
  PhysicianSearchController.$inject = [ "$http", "$location", "PHYSCConstants" ];
  function PhysicianSearchController($http, $location, PHYSCConstants) {
    this.specialityOptions1 = {
      "Allopathic & Osteopathic Physicians/ Family Medicine": "Family Practice",
      "Allopathic & Osteopathic Physicians/ Internal Medicine": "Internal Medicine",
      "Allopathic & Osteopathic Physicians/ Pediatrics": "Pediatrics"
    }
    var a = this;
    this.searchPhysician = function() {
      var phyFirstName = this.phy.firstName ? PHYSCConstants.fName + this.phy.firstName + "&" : "",
      phyLastName = this.phy.lastName ? PHYSCConstants.lName + this.phy.lastName + "&" : "",
      phyCity = this.phy.city ? PHYSCConstants.city + this.phy.city + "&" : "",
      phyState = this.phy.state ? PHYSCConstants.st + this.phy.state : "",
      phySpeciality = this.phy.speciality ? PHYSCConstants.spec + this.phy.speciality + "&" : "";
      $http.get(PHYSCConstants.openCMSUrl + phyFirstName + phyLastName + phyCity + phyState + phySpeciality)
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
