(function() {
  "use strict";
  FDACallController.$inject = [ "$http" ];
  function FDACallController($http) {
    var a = this,
    url = "https://api.fda.gov/drug/event.json?api_key=Xgd5lx8BAGRQThoeLjBRWRApQZxr6o9Qh87R3rbU&search=";
    $http.get(url + "patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact" )
    .success(function(data) {
      a.FDA = data.results;
      console.log(a.FDA);
    })
    .error(function(err) {
      console.log(err);
    })
  }
  angular.module("myApp")
  .controller("FDACallController", FDACallController)
}());
