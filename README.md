+  Making Good Progress finally found route to retrieve all other drugs within same class
    + 1. Retrieve the trademark drug and specific ingredients within the brand drug
    + http://rxnav.nlm.nih.gov/RxNormAPIs.html#uLink=RxNorm_REST_getRelatedByRelationship
      + Example: Aggrenox by Boehringer Ingelheim Pharmaceuticals is actually Aspiring + Dipyridamole
        + http://rxnav.nlm.nih.gov/REST/rxcui/226718/related?rela=tradename_of+has_precise_ingredient
    + 2.  Retrieve drug classes for the RXCUI retrieved for specific ingredients if possible
      + Example: Aspirin which is in Aggrenox has a lot of drug classes
        + http://rxnav.nlm.nih.gov/REST/rxclass/class/byRxcui.json?rxcui=1191
    + 3.  Retrieve the drug members within the same class
      + http://rxnav.nlm.nih.gov/RxClassAPIs.html#uLink=RxClass_REST_getClassMembers
      + Example of member drugs for a particular drug class for Aspiring
      + http://rxnav.nlm.nih.gov/REST/rxclass/classMembers.json?classId=N0000009006&relaSource=NDFRT&rela=has_PE&trans=0&ttys=IN

+     Yet To come
  + Distinct translations for all of the drug classes to laymen terms

<h1>The Journey for Data Is Almost Complete Young Padawan!</h1>

Adverse effects for drug url: https://api.fda.gov/drug/event.json?api_key=Xgd5lx8BAGRQThoeLjBRWRApQZxr6o9Qh87R3rbU&search=patient.drug.openfda.brand_name:%22symbicort%22&count=patient.reaction.reactionmeddrapt.exact

NEXT STEPS:
Look up drug class and display drug class along with drugs in class
complete table with similair drugs and spending and advese effects graph
