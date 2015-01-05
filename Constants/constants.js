(function() {
  angular.module("myApp")
  .constant("RxSCConstants", {
    openCMSUrl: "https://openpaymentsdata.cms.gov/resource/identified-general-payments-2013.json?",
    rxCompany: "applicable_manufacturer_or_applicable_gpo_making_payment_id=",
    rx: "&name_of_associated_covered_drug_or_biological1="
  })
  angular.module("myApp")
  .constant("RxCoConstants", {
    openCMSUrl: "https://openpaymentsdata.cms.gov/resource/identified-general-payments-2013.json?",
    rxCompany: "applicable_manufacturer_or_applicable_gpo_making_payment_id=",
  })
  angular.module("myApp")
  .constant("PHYSCConstants", {
    openCMSUrl: "https://openpaymentsdata.cms.gov/resource/physician-profile-data-2013.json?",
    fName: "physician_profile_first_name=",
    lName: "physician_profile_last_name=",
    city: "physician_profile_city=",
    st: "physician_profile_state=",
    spec: "&physician_speciality="
  })
}());
