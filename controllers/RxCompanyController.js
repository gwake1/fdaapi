(function() {
  "use strict";
  RxCompanyController.$inject = [ "$http", "$routeParams", "RxCompanyFactory" ];
  function RxCompanyController($http, $routeParams, RxCompanyFactory) {
    var a = this;
    RxCompanyFactory.getRxCo(function(data) {
      a.Rx = data;
      a.rxCoTotalPMT(a.Rx);
      console.log(a.Rx)
    })
    a.rxCoTotalPMT = function(phy) {
      var a = this;
      a.RxCoPMTTotal = 0;
      $(phy).each(function(index) {
        a.RxCoPMTTotal = a.RxCoPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
  }
  angular.module("myApp")
  .controller("RxCompanyController", RxCompanyController)
}());
