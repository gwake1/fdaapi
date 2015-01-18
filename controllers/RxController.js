(function() {
  "use strict";
  RxController.$inject = [ "$http", "$routeParams", "RxFactory" ];
  function RxController($http, $routeParams, RxFactory) {
    var a = this;
    a.rxNorm;
    a.rxNormName
    a.rxCui;
    a.ingredients;
    RxFactory.getRx(function(data) {
      a.Rx = data;
      a.rxGenTotalPMT(a.Rx);
      a.validateRxCui(a.Rx[0]);
    })
    a.p1 = new Promise(function(resolve, reject) {
      resolve(a.validateRxCui(a.Rx[0]))
    })
    a.rxGenTotalPMT = function(phy) {
      a.RxPMTTotal = 0;
      $(phy).each(function(index) {
        a.RxPMTTotal = a.RxPMTTotal + Number(phy[index].total_amount_of_payment_usdollars, 2);
      })
    }
    a.dehyphenateNDC = function(ref) {
      if (typeof ref == "undefined"){
        console.log("error: create alert function to perform search on this drug using rxclass autosuggestions")
      } else {
        var hyphenated = String(ref)
        console.log(hyphenated + " " + ref);
        a.dehyphenatedNDC = hyphenated.split("-").join("");
        return a.dehyphenatedNDC;
      }
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
      var drugName = ref.name_of_associated_covered_drug_or_biological1,
      ndc = ref.ndc_of_associated_covered_drug_or_biological1;
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
for (var i = 0; i < 4; i++) {
  if (i < 3) {
    if (typeof a.rxNorm !== "string") {
      a.dehyphenateNDC(ndc);
      a.hyphenateNDC(a.dehyphenatedNDC, a.hyphen[i]);
    } else if (typeof a.rxNorm == "string") {
      console.log("NDC to RXCUI");
    }
  } else if (i === 3 && typeof a.rxNorm !== "string") {
    a.rxCuiNameSearch(ref, drugName);
  }
}
}
a.activeIngredients = function(ref) {
  var url = "http://rxnav.nlm.nih.gov/REST/rxcui/" + ref + "/related.json?rela=tradename_of+has_precise_ingredient";
  if(typeof ref == "undefined"){
    ref = a.rxNormName;
    $http.get(url)
    .success(function(data){
      console.log("active ingredients results");
      var ingredients = data.relatedGroup.conceptGroup;
      console.log(ingredients);
      a.rxDrugClasses(ingredients)
    })
    .error(function(err){
      console.log(err);
    })
  } else {
    $http.get(url)
    .success(function(data){
      console.log("active ingredients results");
      a.ingredients = data.relatedGroup.conceptGroup;
      console.log(a.ingredients);
      a.rxDrugClasses(a.ingredients)
    })
    .error(function(err){
      console.log(err);
    })
  }
}
a.rxDrugClasses = function (ref) {
  for (var i = 0; i < ref.length; i++) {
    console.log(ref[i].tty)
  }
}
a.rxCuiNameSearch = function(ref, drugName) {
  var url =  "http://rxnav.nlm.nih.gov/REST/rxcui.json?name=";
  $http.get(url + drugName)
  .success(function(data) {
    a.rxNorm = data.idGroup.rxnormId[0]
    console.log("name search returned: " + a.rxNorm);
    a.activeIngredients(a.rxNorm);
  })
  .error(function(err) {
    console.log(err);
  })
}
a.getRxCui = function(ref) {
  console.log(ref);
  // a.hyphenNDC = a.hyphenateNDC(ref, hyphen);
  var url = "http://rxnav.nlm.nih.gov/REST/rxcui.json?idtype=NDC&id=";
  $http.get(url + ref)
  .success(function(data) {
    a.rxNorm = data.idGroup.rxnormId;
    if (typeof a.rxNorm === "undefined") {
      console.log("no result for " + ref + " " + typeof a.rxNorm)
    } else {
      console.log(a.rxNorm + typeof a.rxNorm);
      a.activeIngredients(a.rxNorm);
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
