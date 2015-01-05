(function() {
  "use strict";
  RxCompanyController.$inject = [ "$http", "$location", "$routeParams", "RxCompanyFactory" ];
  function RxCompanyController($http, $location, $routeParams, RxCompanyFactory) {
    var a = this;
    RxCompanyFactory.getRxCo(function(data) {
      a.RxCo = data;
      a.rxCoTotalPMT(a.RxCo);
      console.log(a.RxCo)
    })
    a.rxCoTotalPMT = function(phy) {
      var a = this;
      a.RxCoPMTTotal = 0;
      $(phy).each(function(index) {
        a.RxCoPMTTotal = a.RxCoPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
    a.goToDrug = function(name_of_associated_covered_drug_or_biological1, applicable_manufacturer_or_applicable_gpo_making_payment_name) {
      $location.path("/rxsearch/" + applicable_manufacturer_or_applicable_gpo_making_payment_name + "/" + name_of_associated_covered_drug_or_biological1)
    }
  }
  angular.module("myApp")
  .controller("RxCompanyController", RxCompanyController)
}());
