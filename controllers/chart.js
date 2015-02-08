(function() {
  // "use strict";
  chart.$inject = [ "$http", "$q" ];
  function chart($http, $q) {
    var obj = {
      "foo": 1,
      "bar": 2
    },
    executeNames = ["Symbicort", "Aggrenox"],
    uniqueNames = {},
    jeezy = [],
    jeezy2 = [];
    var uniqueFilter = function(ref) {
      var o = ref, i, l = ref.length, r = [];
      for(i=0; i<l;i++) o[this[i]] = this[i];
      for(i in o) r.push(o[i]);
      return r;
    };
    // for (var key in obj) {
    //   console.log(obj[key]);
    // }
    var populateData = function(ref){
      var o = ref, i, l=ref.length, r = [];
      for(i=0; i<l; i++)
      {
        drugName = ref[i].toString();
        xIteration = "x"+i.toString();
        var url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:" + drugName + "&count=patient.reaction.reactionmeddrapt.exact";
        $http.get(url)
        .success(function(data) {
          console.log(data);
          jeezy.push(drugName);
          jeezy2.push(xIteration);
          var gw = data.results;
          for (var key in gw) {
            jeezy.push(gw[key].term);
            jeezy2.push(gw[key].count);
            uniqueNames[gw[key].term];
            uniqueNames[gw[key].term] = gw[key].term;
          }
          console.log(jeezy);
          console.log(jeezy2);
          console.log(uniqueFilter(uniqueNames));
        })
      }
    }
    populateData(executeNames);
  }
  angular.module("myApp")
  .controller("chart", chart)
}());



//
//   function chart ($http) {
//     var
//     u ={},
//     a = [],
//     effectsName = [],
//     effectsCount = [],
//     rxcui = [ "1191", "3521" ];
//
//
//
//
//
//
//
//     var getdata = function(rxcui) {
//       for (var i = 0; i < rxcui.length; i++) {
//         var url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.rxcui." + rxcui[i] + "&count=patient.reaction.reactionmeddrapt.exact";
//         $http.get(url)
//         .success(function(data) {
//           console.log(data);
//           for (var j = 0; j <= data.results.length; j++) {
//             processEffects(data.results[j], j, data.results.length, i, rxcui.length);
//             if (!u.hasOwnProperty(effectsName[j])) {
//               a.push(effectsName[j]);
//               u[effectsName[j]] = 1;
//             }
//           }
//           return a;
//         })
//         .error(function(err) {
//           console.log(err);
//         });
//       }
//     }
//     // var unique = function(arr) {
//     //   var u = {}, a = [];
//     //   for(var i = 0, l = arr.length; i < l; ++i){
//     //     if(!u.hasOwnProperty(arr[i])) {
//     //       a.push(arr[i]);
//     //       u[arr[i]] = 1;
//     //     }
//     //   }
//     //   return a;
//     //   }
//     // }
//     var dataName = function(effectsName) {
//       for (var i = 0; i < effectsName.length; i++) {
//
//       }
//     }
//     var processEffects = function(effect, iterate, limit, ver, vertotal) {
//
//         } else if (iterate === limit && ver === vertotal) {
//           for (var l = 0; l < effectsCountHolder.length; l++) {
//             effectsCount.push(effectsCountHolder[l]);
//             console.log("effects count holder");
//             console.log(effectsCountHolder);
//             console.log(effectsCount);
//           }
//
//         } else {
//           effectsName.push(effect.term);
//           effectsCountHolder[rxcui[i]].push(effect.count);
//         }
//       }
//     }
//     var chart = c3.generate({
//       data: {
//         json: {
//           ASPIRIN: [450, 0, 50, 40, 60, 50],
//           data2: [200, 130, 90, 240, 130, 220],
//           data3: [300, 200, 160, 400, 250, 250]
//         }
//       },
//       zoom: true,
//       axis: {
//         x: {
//           type: "category",
//           categories: a,
//           tick: {
//             rotate: 75,
//             multiline: false
//           },
//           height: 130
//         }
//       }
//     });
//     getdata(rxcui);
//   }
//   angular.module("myApp")
//   .controller  ("chart", chart)
// }());
