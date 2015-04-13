(function() {
  "use strict";
  angular.module("myApp")
  .factory("chartFactory", function($http, $q, $resource) {
    var dataResults ={};
    function produceData(drugs){
      var promises = drugs.map(function(drug){
        getDrug(drug);
      });
      return $q.all(promises).then(function(){return dataResults});
    }
    function getDrug(drugName) {
      var drug =$resource("https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact", {search: '@id'});
      drug.get({search:"patient.drug.openfda.brand_name:"+drugName})
      .$promise.then(function(data) {
        dataResults[drugName] = data.results;
      });
    }
    return {
      getDrug: getDrug,
      produceData: produceData
    }
  })
}());
