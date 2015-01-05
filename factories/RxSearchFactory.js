(function() {
  "use strict";
  angular.module("myApp")
  .factory("RxSearchFactory", function($http, $location, $routeParams) {
    function getRx(cb) {
      var url = "https://openpaymentsdata.cms.gov/resource/identified-general-payments-2013.json?applicable_manufacturer_or_applicable_gpo_making_payment_id=",
      pharmCompany = $routeParams.applicable_manufacturer_or_applicable_gpo_making_payment_id,
      drug = "&name_of_associated_covered_drug_or_biological1=" + $routeParams.name_of_associated_covered_drug_or_biological1;
      $http.get(url + pharmCompany + drug)
      .success(function(data) {
        cb(data);
      })
      .error(function(err) {
        console.log($routeParams)
      })
    }
    return {
      getRx: getRx
    }
  })
}());
