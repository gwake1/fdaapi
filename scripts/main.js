(function() {
  "use strict";
  angular.module("myApp", [])
  .controller("FDACallController", function($http) {
    var a = this,
    url = "https://api.fda.gov/drug/event.json?api_key=Xgd5lx8BAGRQThoeLjBRWRApQZxr6o9Qh87R3rbU&search=";
    $http.get(url + "patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact" )
    .success(function(data) {
      a.FDA = data.results;
      console.log(a.FDA);
    })
    .error(function(err) {
      console.log(err);
    })
  })
  .controller("FDABrandController", function($http) {
    var a = this,
    url = "https://api.fda.gov/drug/event.json?api_key=Xgd5lx8BAGRQThoeLjBRWRApQZxr6o9Qh87R3rbU&search=";
    $http.get(url + "patient.drug.openfda.brand_name:\"tylenol\"&count=patient.reaction.reactionmeddrapt.exact")
    .success(function(data) {
      a.FDAB = data.results;
      console.log(a.FDAB);
    })
    .error(function(err) {
      console.log(err);
    })
  })
  .controller("PaymentController", function($http) {
    var a = this,
    url = "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?",
    phyFirstName = "physician_profile_first_name=Ayrika",
    phyLastName = "&physician_profile_last_name=Bell";
    $http.get(url + phyFirstName + phyLastName)
    .success(function(data) {
      a.Provider = data;
      console.log(a.Provider)
    })
    .error(function(err) {
      console.log(err);
    })
  a.inspectPhysician = function(physician_id){  $http.get("https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?physician_id="+physician_id)
  .success(function(data){
    a.Physician = data;
    console.log(a.Physician)
  })
  .error(function(err){
    console.log(err)
  })
  }
  })
}());
