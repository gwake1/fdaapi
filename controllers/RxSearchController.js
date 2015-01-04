(function() {
  "use strict";
  RxSearchController.$inject = [ "$http", "$routeParams", "$scope" ];
  // function RxSearchController($http, $routeParams, $scope) {
  //   this.limit = {
  //     base: 0,
  //     increment: 500
  //   };
  //   var a = this,
  //   url = "https://ndcgw.firebaseio.com/data/",
  //   ref = new Firebase("https://nadacpugw.firebaseio.com/");
  //   this.increment = function(increment, base) {
  //     var limit = this.limit;
  //     limit.base += 500;
  //     limit.increment += 500;
  //     console.log(limit);
  //   }
  //   this.createAPI = function() {
  //     var begin = this.limit.base,
  //     end = this.limit.increment;
  //     $http.get(url)
  //     .success(function(data) {
  //       for ( var i = begin; i < end; i++ ) {
  //         $http.get(url + i +  ".json")
  //         .success(function(data) {
  //           a.NDC = data.NDC;
  //           var nDC = a.NDC,
  //           formularyitem = data;
  //           ref.child("data").child(nDC).set(formularyitem)
  //         })
  //         .error(function(err) {
  //           console.log(err)
  //         })
  //       }
  //     })
  //   }
  // }
  function RxSearchController($http, $routeParams, $scope) {
    var a = this;
      var url = "https://openpaymentsdata.cms.gov/resource/identified-general-payments-2013.json?applicable_manufacturer_or_applicable_gpo_making_payment_id=",
      pharmCompany = $routeParams.applicable_manufacturer_or_applicable_gpo_making_payment_id,
      drug = "&name_of_associated_covered_drug_or_biological1=" + $routeParams.name_of_associated_covered_drug_or_biological1;
      $http.get(url + pharmCompany + drug)
      .success(function(data) {
        console.log(data)
      })
      .error(function(err) {
        console.log($routeParams)
      })
    }

  angular.module("myApp")
  .controller("RxSearchController", RxSearchController)
}());
