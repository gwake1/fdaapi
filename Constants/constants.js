(function() {
angular.module("myApp")
.constant("RxSCConstants", {
  openCMSUrl: "https://openpaymentsdata.cms.gov/resource/identified-general-payments-2013.json?",
  rxCompany: "applicable_manufacturer_or_applicable_gpo_making_payment_id=",
  rx: "&name_of_associated_covered_drug_or_biological1="
})
}());
