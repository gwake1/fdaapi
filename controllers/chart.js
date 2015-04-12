(function() {
  // "use strict";
  function chart ($http) {
    var
    effectsName = [],
    effectsCount = [],
    url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:%22aggrenox%22&count=patient.reaction.reactionmeddrapt.exact";
    $http.get(url)
    .success(function(data) {
      console.log(data);
      for (var i = 0; i <= data.results.length; i++) {
        processEffects(data.results[i], i, data.results.length);
      }
    })
    .error(function(err) {
      console.log(err);
    });
    var processEffects = function(effect, iterate, limit) {
      if (iterate == 0) {
        effectsName.push(effect.term);
        effectsCount.push("data1", effect.count);
      } else if (iterate === limit) {
        console.log(effectsName);
        console.log(effectsCount);
        var chart = c3.generate({
          data: {
            // xs: {
            //   "data1": "x1",
            // },
            columns: [
            effectsCount
            ]
          },
          zoom: {
            enabled: true
          },
          axis: {
            x: {
              type: "category",
              categories: effectsName,
              tick: {
                rotate: 75,
                multiline: false
              },
              height: 130
            }
          }
        })
      } else {
        effectsName.push(effect.term);
        effectsCount.push(effect.count);
      }
    }
    //function() {
    //   var chart = c3.generate({
    //     data: {
    //       xs: {
    //         "data1": "x1"
    //       },
    //       columns: [
    //       effectsName,
    //       effectsCount
    //       ]
    //     }
    //   })
    // }
  }
  angular.module("myApp")
  .controller  ("chart", chart)
}());
