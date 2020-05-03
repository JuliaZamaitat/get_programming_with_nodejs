const zipCode = require('german-zip-codes');
var myDistrict = zipCode.getDistrictsByZipCode("77855");
console.log(myDistrict);
