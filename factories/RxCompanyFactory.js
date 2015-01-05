(function() {
  "use strict";
  angular.module("myApp")
  .factory("RxCompanyFactory", function($http, $location, $routeParams, RxCoConstants) {
    function getRxCo(cb) {
      var pharmCompany = $routeParams.applicable_manufacturer_or_applicable_gpo_making_payment_id;
      $http.get(RxCoConstants.openCMSUrl + RxCoConstants.rxCompany + pharmCompany)
      .success(function(data) {
        cb(data);
      })
      .error(function(err) {
        console.log($routeParams)
      })
    }
    return {
      getRxCo: getRxCo
    }
  })
}());
