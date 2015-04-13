(function() {
  // "use strict";
  chart.$inject = [ "$http", "$q", "$resource", "chartFactory", "$scope" ];
  function chart($http, $q, $resource, chartFactory, $scope) {
    var cats;
    var countData;
    var limit;
    var minIteration;
    var currentTerm;
    var iter = 0;
    var drugList = ["symbicort", "aggrenox", "tylenol", "aspirin", "prilosec", "ibuprofen"];
    var jerry = produceData(drugList);
    var termList = [];
    var drug = function(name, results, orig, uniq){
      this.name = name,
      this.results = results,
      this.orig = orig;
      this.uniq = uniq;
    }
    var dataResults = {};
    $scope.counts = [];
    console.log(jerry);
    function finalizeData(){
    }
    function produceData(drugs){
      var promises = drugs.map(function(drug){getDrug(drug)});
      minIteration = (drugs.length - 0.5)*100;
      return $q.all(promises);
    }
    function getDrug(drugName) {
      var url =$resource("https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact", {search: '@id'});
      url.get({search:"patient.drug.openfda.brand_name:"+drugName}, function(data){
        var results = data.results;
        var orig = _.map(results, function(obj){return obj.term});
        var temp = new drug(drugName, results, orig);
        dataResults[drugName] = temp;
        $scope.drugData = dataResults;
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
        termList = _.sortBy(termList, function(term){return term;});
        $scope.terms = termList;
        getUniq();
      }
    }
    function getUniq(){
      var drugs = dataResults;
      var count = []
      _.map(drugs, function(drug){
        var list = drug.orig;
        var countData = drug.results;
        var temp = [];
        temp.push(drug.name);
        for (var i = 0; i < termList.length; i++) {
          var check = termList[i];
          if (_.indexOf(list, check) >= 0) {
            var propIndex = _.indexOf(list, check);
            var itemCount = countData[propIndex].count;
            temp.push(itemCount);
          } else {
            temp.push(0);
          }
        }
        count.push(temp);
      })
      console.log(count)
      $scope.counts = count;
      limit = $scope.counts[0].length;
      var tempTermsArray = [];
      var tempTermsArray = termList;
      termList = _.first(termList, limit);
      $scope.terms = termList;
      countData = $scope.counts;
      var cats =  _.first(termList, limit);
      graph();
    }
    function graph(){
      // var countData = $scope.counts;
      var cats =  _.first(termList, limit);
      var finalColumns = [];
      for (var i = 0; i < countData.length; i++) {
        finalColumns.push(countData[i]);
      }

      var chart = c3.generate({
        data: {
          columns:
          finalColumns
          ,
          type: 'spline'
        },
        axis: {
          x: {
            type: 'category',
            categories: cats,
            tick: {
                rotate: 75,
                multiline: false
              },
              height: 130
          }
        },
        zoom: {
          enabled: true
        },
      });

      // c3.generate({
      //   data: {
      //     columns: [
      //       countData
      //     ]
      //   },
      //   axis: {
      //     x: {
      //       type: 'category',
      //       categories: cats
      //     }
      //   }
      // })
    }
  }
  angular.module("myApp")
  .controller("chart", chart)
}());
