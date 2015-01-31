(function() {
  // "use strict";
  function chart ($http) {
    var
    effectsName = [],
    effectsCount = [],
    rxcui = [ "1191", "3521" ];
    var getdata = function(rxcui) {
      for (var i = 0; i < rxcui.length; i++) {
        var url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.rxcui." + rxcui[i] + "&count=patient.reaction.reactionmeddrapt.exact";
        $http.get(url)
        .success(function(data) {
          console.log(data);
          for (var j = 0; j <= data.results.length; j++) {
            processEffects(data.results[j], j, data.results.length, i, rxcui.length);
          }
        })
        .error(function(err) {
          console.log(err);
        });
      }
    }
    var dataName = function(effectsName) {
      for (var i = 0; i < effectsName.length; i++) {

      }
    }
    var processEffects = function(effect, iterate, limit, ver, vertotal) {
      if (iterate == 0) {
        effectsName.push(effect.term);
        effectsCount.push("data" + ver, effect.count);
      } else if (iterate === limit && ver === vertotal) {
        console.log(ver + effectsName);
        console.log(ver + effectsCount);
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
    getdata(rxcui);
  }
  angular.module("myApp")
  .controller  ("chart", chart)
}());
