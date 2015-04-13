(function() {
  // "use strict";
  chart.$inject = [ "$http", "$q", "$resource", "chartFactory", "$scope" ];
  function chart($http, $q, $resource, chartFactory, $scope) {
    var drugList = ["symbicort", "aggrenox"];
    $scope.drugData = {};
    $scope.drugData = chartFactory.produceData(drugList);
  };
  angular.module("myApp")
  .controller("chart", chart)
}());
