(function() {
  "use strict";
  PhysicianController.$inject = [ "$scope", "$routeParams", "$http", "$location" ];
  function PhysicianController( $scope, $routeParams, $http, $location) {
    var a = this,
    physician_id = $routeParams.physician_id,
    url = "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?physician_id=";
    a.getTotal = function() {
      var dynsum = 0;
      for ( var i = 0 ; i < a.genPMTData.length ; i++ ) {
        var product = a.genPMTData[i];
        dynsum += a.genPMTData[i].total_amount_of_payment_usdollars;
      }
      return dynsum;
    }
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
    this.goToDrug = function(name_of_associated_covered_drug_or_biological1, applicable_manufacturer_or_applicable_gpo_making_payment_name) {
      $location.path("/rxsearch/" + applicable_manufacturer_or_applicable_gpo_making_payment_name + "/" + name_of_associated_covered_drug_or_biological1)
    }
  }
  angular.module("myApp")
  .controller("PhysicianController", PhysicianController)
}());
