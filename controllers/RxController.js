(function() {
  "use strict";
  RxController.$inject = [ "$http", "$routeParams", "RxFactory" ];
  function RxController($http, $routeParams, RxFactory) {
    var a = this;
    RxFactory.getRx(function(data) {
      a.Rx = data;
      a.phyGenTotalPMT(a.Rx);
      console.log(a.Rx)
    })
    a.phyGenTotalPMT = function(phy) {
      var a = this;
      a.RxPMTTotal = 0;
      $(phy).each(function(index) {
        a.RxPMTTotal = a.RxPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
  }
  angular.module("myApp")
  .controller  ("RxController", RxController)
}());
