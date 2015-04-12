(function() {
  "use strict";
  angular.module("myApp")
  .factory("chartFactory", function($http, $q, $resource) {
    function getDrug(drugName) {
      var term = drugName;
      var drug =$resource("https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact", {search: '@id'});
      drug.get({search:"patient.drug.openfda.brand_name:"+drugName})
      .$promise.then(function(data) {
        console.log(data);
        return data;
      });
      // var deferred= $q.defer();
      // var url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:" + drugName + "&count=patient.reaction.reactionmeddrapt.exact";
      // $http.get(url).success(deferred.resolve).error(deferred.reject);
      // return deferred.promise;
    }
    return {
      getDrug: getDrug
    }
  })
}());
