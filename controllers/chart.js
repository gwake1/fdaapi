(function() {
  // "use strict";
  chart.$inject = [ "$http", "$q", "$resource", "chartFactory" ];
  function chart($http, $q, $resource, chartFactory) {
    chartFactory.getDrug("symbicort");
    // var obj = {
    //   "foo": 1,
    //   "bar": 2
    // },
    // jeezy = [];
    // for (var key in obj) {
    //   console.log(obj[key]);
    // }
    // var url = "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:%22symbicort%22&count=patient.reaction.reactionmeddrapt.exact";
    // $http.get(url)
    // .success(function(data){
    //   console.log(data);
    //   var gw = data.results;
    //   for(var key in gw){
    //     jeezy.push(gw[key].term);
    //   }
    //   console.log(jeezy);
    // })
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
