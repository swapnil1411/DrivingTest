// Model Files
// const User = require('../models/User');

module.exports = (req, res, next) => {
   try {
      if (req.body.fname == null ||
         req.body.lname == null ||
         req.body.lnumber == null ||
         req.body.age == null ||
         req.body.birthDate == null ||
         req.body.companyName == null ||
         req.body.modelName == null ||
         req.body.year == null ||
         req.body.plateNumber == null
      ) {
         return res.redirect('/g2-test/?param1=Every field is required.')
      }
      next()
   } catch (error) {

   }
}