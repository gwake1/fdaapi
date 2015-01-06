(function() {
  "use strict";
  RxController.$inject = [ "$http", "$routeParams", "RxFactory" ];
  function RxController($http, $routeParams, RxFactory) {
    var a = this;
    a.rxNorm = 0;
    RxFactory.getRx(function(data) {
      a.Rx = data;
      a.rxGenTotalPMT(a.Rx);
      a.validateRxCui(a.Rx[0]);
      console.log(a.Rx)
    })
    a.rxGenTotalPMT = function(phy) {
      a.RxPMTTotal = 0;
      $(phy).each(function(index) {
        a.RxPMTTotal = a.RxPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
    a.hyphenateNDC = function(ref) {
      a.NDC = ref.ndc_of_associated_covered_drug_or_biological1;
      a.NDCArr = [];
      for ( var i = 0; i < 12; i++ ) {
        if (i === 4 || i === 9) {
          a.NDCArr.push("-")
        } else if (i < 4) {
          a.NDCArr.push(String(a.NDC.charAt(i)));
        } else if (i < 9) {
          a.NDCArr.push(String(a.NDC.charAt(i - 1 )));
        } else if (i < 12) {
          a.NDCArr.push(String(a.NDC.charAt(i - 2)));
        }
      }
      a.NDCArr = a.NDCArr.join("");
      return a.NDCArr;
    }
    a.validateRxCui = function(ref) {
      var hyphen = {
        b: 5,
        c: 4,
        d: 3
      };
      if (typeof  a.rxNorm === "undefined") {
        console.log("error with 4-4-2");
      } else {
        console.log("success");
      }
    }
    a.getRxCui = function(ref) {
      a.hyphenNDC = a.hyphenateNDC(ref);
      var url = "http://rxnav.nlm.nih.gov/REST/rxcui.json?idtype=NDC&id=";
      $http.get(url + a.hyphenNDC)
      .success(function(data) {
        a.rxNorm = data.idGroup.rxnormId;
        console.log(a.rxNorm, data);
      })
      .error(function(err) {
        console.log(err);
      })
    }
  }
  angular.module("myApp")
  .controller  ("RxController", RxController)
}());
