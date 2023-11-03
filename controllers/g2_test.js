// Model Files
const User = require('../models/User');

module.exports = async (req, res) => {
   let message = req.query.param;
   try {
      const userId = req.session.userId;
      let result = await User.findById(userId);
      if (result.lnumber == null) {
         result = false;
         res.render("g2-test", { result: result, message: message });
      } else {
         res.render("g2-test", { result: result, message: message });
      }

   } catch (error) {
      console.log(error)
   }
}