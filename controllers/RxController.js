(function() {
  "use strict";
  RxController.$inject = [ "$http", "$routeParams", "RxFactory" ];
  function RxController($http, $routeParams, RxFactory) {
    var a = this;
    a.rxNorm = {
      ready: 1,
      aim: 0,
      fire: 0
    };
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
    a.hyphenateNDC = function(ref, hyphen) {
      a.NDC = ref.ndc_of_associated_covered_drug_or_biological1;
      a.NDCArr = [];
      for ( var i = 0; i < 13; i++ ) {
        if (i === hyphen.labeler || i === hyphen.labeler + hyphen.productrx + 1) {
          a.NDCArr.push("-")
        } else if (i < hyphen.labeler) {
          a.NDCArr.push(String(a.NDC.charAt(i)));
        } else if (i < hyphen.productrx + hyphen.labeler + 1) {
          a.NDCArr.push(String(a.NDC.charAt(i - 1)));
        } else if (i < 13) {
          a.NDCArr.push(String(a.NDC.charAt(i - 2)));
        }
      }
      a.NDCArr = a.NDCArr.join("");
      return a.NDCArr;
    }
    a.validateRxCui = function(ref) {
      var hyphen = [{
          labeler: 4,
          productrx: 4,
          package: 2
        },
        {
          labeler: 5,
          productrx: 4,
          package: 1
        },
        {
          labeler: 5,
          productrx: 3,
          package: 2
        }
      ];
      for (var i = 0; i < 3; i++ ) {
        a.getRxCui(ref, hyphen[i]);
      }
    }
    a.getRxCui = function(ref, hyphen) {
      a.hyphenNDC = a.hyphenateNDC(ref, hyphen);
      var url = "http://rxnav.nlm.nih.gov/REST/rxcui.json?idtype=NDC&id=";
      $http.get(url + a.hyphenNDC)
      .success(function(data) {
        a.rxNorm = data.idGroup.rxnormId;
        if (a.rxNorm !== undefined) {
          console.log(a.rxNorm)
          return a.rxNorm;
        }
      })
      .error(function(err) {
        console.log(err);
      })
    }
  }
  angular.module("myApp")
  .controller  ("RxController", RxController)
}());
