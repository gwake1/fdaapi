(function() {
  "use strict";
  RxController.$inject = [ "$http", "$routeParams", "RxFactory" ];
  function RxController($http, $routeParams, RxFactory) {
    var a = this;
    a.rxNorm;
    RxFactory.getRx(function(data) {
      a.Rx = data;
      a.rxGenTotalPMT(a.Rx);
      a.validateRxCui(a.Rx[0]);
      console.log(a.Rx);
    })
    a.rxGenTotalPMT = function(phy) {
      a.RxPMTTotal = 0;
      $(phy).each(function(index) {
        a.RxPMTTotal = a.RxPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
    a.dehyphenateNDC = function(ref) {
      var hyphenated = ref,
      ref = hyphenated.split("-").join("");
      a.dehyphenatedNDC = ref;
      return a.dehyphenatedNDC;
    }
    a.hyphenTester = function(ref) {
      if (!/[-._:]/.test(ref)) {
        console.log("hyphen test true", ref)
        return true;
      } else {
        console.log("hyphen test false");
        return false;
      }
    }
    a.hyphenateNDC = function(ref, hyphen) {
      console.log(ref);
      // a.NDC = a.dehyphenateNDC(ref);
      a.NDC = ref;
      a.NDCArr = [];
      for ( var i = 0; i < 12; i++ ) {
        if (i === hyphen.labeler || i === (hyphen.labeler + hyphen.productrx + 1)) {
          a.NDCArr.push("-");
        } else if (i < hyphen.labeler) {
          a.NDCArr.push(String(a.NDC.charAt(i)));
        } else if (i < hyphen.productrx + hyphen.labeler + 1) {
          a.NDCArr.push(String(a.NDC.charAt(i - 1)));
        } else if (i < 13) {
          a.NDCArr.push(String(a.NDC.charAt(i - 2)));
        }
      }
      console.log(a.NDCArr.join(""));
      ref = a.NDCArr.join("");
      a.getRxCui(ref);
    }
    a.validateRxCui = function(ref) {
      var drugName = ref.name_of_associated_covered_drug_or_biological1;
      ref = ref.ndc_of_associated_covered_drug_or_biological1;
      a.hyphen = [
    {
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
for (var i = 0; i < 3; i++) {
  a.dehyphenateNDC(ref);
  a.hyphenateNDC(a.dehyphenatedNDC, a.hyphen[i]);
  if (i == 2 && typeof a.rxNorm === "undefined") {
    var url =  "http://rxnav.nlm.nih.gov/REST/rxcui.json?name=";
    $http.get(url + drugName)
    .success(function(data){
      console.log("name search returned: " + data.idGroup.rxnormId[0]);
    })
    .error(function(err){
      console.log(err);
    })
  }
}
// for (var i = 0; i < 3; i++) {
//   a.getRxCui(ref, hyphen[i]);
//   if (a.rxNorm !== "undefined") {
//     break;
//   }
// }
}
a.getRxCui = function(ref) {
  console.log(ref);
  // a.hyphenNDC = a.hyphenateNDC(ref, hyphen);
  var url = "http://rxnav.nlm.nih.gov/REST/rxcui.json?idtype=NDC&id=";
  $http.get(url + ref)
  .success(function(data) {
    a.rxNorm = data.idGroup.rxnormId;
    if (typeof a.rxNorm === "undefined") {
      console.log("no result")
    } else if (typeof a.rxNorm === "object") {
      var url = "http://rxnav.nlm.nih.gov/REST/rxclass/class/byRxcui.json?rxcui="
      $http.get(url + a.rxNorm)
      .success(function(data) {
        console.log(data);
      })
      .error(function(err) {
        console.log(err);
      })
      console.log(a.rxNorm);
      return a.rxNorm;
    }
  })
  .error(function(err) {
    console.log(err);
  })
}
a.preRxCui = function(ref) {
  var url = "http://rxnav.nlm.nih.gov/REST/rxcui.json?idtype=NDC&id=";
  $http.get(url + ref)
  .success(function(data) {
    a.rxNorm = data.idGroup.rxnormId;
    if (a.rxNorm !== "undefined") {
      console.log(a.rxNorm)
      return a.rxNorm;
    }
  })
  .error(function(err) {
    console.log(err);
  })
  a.getRxClass = function(ref) {
  }
}
}
angular.module("myApp")
.controller  ("RxController", RxController)
}());
