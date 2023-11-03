// Model Files
const User = require('../models/User');

module.exports = async (req, res) => {
   try {
      const license = req.params.license;
      const { companyName, modelName, year, plateNumber } = req.body; // get updated car information from form

      const newRecord = await User.findOneAndUpdate(
         { lnumber: license },
         { 'car_detail.companyName': companyName, 'car_detail.modelName': modelName, 'car_detail.year': year, 'car_detail.plateNumber': plateNumber },
         { new: true }
      );

      if (newRecord) {
         res.redirect("/g-test/?param=Successfully Updated");
      } else {
         res.render("dashboard",{ err: "Error updating G2 data." });
      }
   } catch (err) {
      console.error(err);
      res.render("g-test", { err: "Error updating G2 data." });
   }
};
