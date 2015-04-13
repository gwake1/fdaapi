(function() {
  // "use strict";
  chart.$inject = [ "$http", "$q", "$resource", "chartFactory", "$scope" ];
  function chart($http, $q, $resource, chartFactory, $scope) {
    var minIteration;
    var drugList = ["symbicort", "aggrenox"];
    var jerry = produceData(drugList);
    var termList = [];
    var dataResults = {};
    $scope.druggies = {};
    console.log(jerry);
    function produceData(drugs){
      var promises = drugs.map(function(drug){getDrug(drug)});
      minIteration = (drugs.length - 0.5)*100;
      return $q.all(promises);
    }
    function getDrug(drugName) {
      var drug =$resource("https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact", {search: '@id'});
      drug.get({search:"patient.drug.openfda.brand_name:"+drugName}, function(data){
        var results = data.results;
        dataResults[drugName] = results;
        $scope.druggies[drugName] = results;
        console.log(dataResults);
        makeDupes(results);
      })
    }
    function makeDupes(data){
      data.map(function(result){
        var name;
        name = result.term;
        termList.push(name);
        flattenResults();
      });
      $scope.terms = termList;
    }
    function flattenResults(){
      if (termList.length > minIteration) {
        termList = _.uniq(termList);
        $scope.terms = termList;
      }
    }
  }
  angular.module("myApp")
  .controller("chart", chart)
}());
