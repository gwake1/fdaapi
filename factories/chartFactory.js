(function() {
  "use strict";
  angular.module("myApp")
  .factory("chartFactory", function($http, $q, $resource) {
    var drugData = {};
    function produceData(drugs){
      var promises = drugs.map(function(drug){
        getDrug(drug);
      });
      return $q.all(promises);
    }
    function getDrug(drugName) {
      var drug =$resource("https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact", {search: '@id'});
      drug.get({search:"patient.drug.openfda.brand_name:"+drugName})
      .$promise.then(function(data) {
        drugData[drugName] = data.results;
        console.log(data);
        console.log(drugData);
      });
    }
    return {
      getDrug: getDrug,
      produceData: produceData
    }
  })
}());
