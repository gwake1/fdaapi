(function() {
  "use strict";
  angular.module("myApp")
  .factory("chartFactory", function($http, $q, $resource, $rootScope) {
    var dataResults ={};
    function getResults(){
      return dataResults;
    }
    function produceData(drugs){
      var promises = drugs.map(function(drug){
        getDrug(drug);
      });
     return $q.all(promises);
    }
    function getDrug(drugName) {
      var drug =$resource("https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact", {search: '@id'});
      drug.get({search:"patient.drug.openfda.brand_name:"+drugName}, function(data){
        var jerry = data.toJSON();
        dataResults[drugName] = jerry.results;
        $rootScope.druggies[drugName] = jerry.results;
        console.log(dataResults);
        return dataResults;
      })
      // .$promise.then(function(data) {
      //   return data.results;
      // }).then(function(results){
      //   console.log(results);
      //   dataResults[drugName] = results;
      //   console.log(dataResults);
      //   return dataResults;
      // });
    }
    return {
      getDrug: getDrug,
      produceData: produceData,
      getResults: getResults
    }
  })
}());
