(function() {
  "use strict";
  angular.module("myApp")
  .factory("RxSearchFactory", function($http, $location, $routeParams, RxSCConstants) {
    function getRx(cb) {
      var pharmCompany = $routeParams.applicable_manufacturer_or_applicable_gpo_making_payment_id,
      drug = $routeParams.name_of_associated_covered_drug_or_biological1;
      $http.get(RxSCConstants.openCMSUrl + RxSCConstants.rxCompany + pharmCompany + RxSCConstants.rx + drug)
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
