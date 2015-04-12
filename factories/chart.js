(function() {
  "use strict";
  angular.module("myApp")
  .factory("chart", function($http, $q) {
    function getDrug(cb) {
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
