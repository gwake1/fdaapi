(function() {
  // "use strict";
  function chart ($http) {
    var
    effectsName = [],
    effectsKeys = [],
    url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:%22symbicort%22&count=patient.reaction.reactionmeddrapt.exact";
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
        effectsName["name"] = "drug";
        effectsName[effect.term] = effect.count;
        effectsKeys.push(effect.term);
      } else if (iterate === limit) {
        console.log(effectsName);
        console.log(effectsKeys);
        var chart = c3.generate({
          data: {
            json: [effectsName]
            ,
            keys: {
              x: 'name', // it's possible to specify 'x' when category axis
              value: effectsKeys,
            }
          },
          axis: {
            x: {
              type: 'category'
            }
          }
        });


        // var chart = c3.generate({
        //   data: {
        //     // xs: {
        //     //   "data1": "x1",
        //     // },
        //     x: "x",
        //     columns: [
        //     effectsName,
        //     effectsCount
        //     ],
        //     type: "line"
        //   },
        //   zoom: {
        //     enabled: true
        //   },
        //   axis: {
        //     x: {
        //       type: 'category',
        //       tick: {
        //         rotate: 75,
        //         multiline: false
        //       },
        //       height: 130
        //     }
        //   }
        // })
      } else {
        effectsName[effect.term] = effect.count;
        effectsKeys.push(effect.term);
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
