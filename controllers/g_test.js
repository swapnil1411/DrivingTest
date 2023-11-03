// Model Files
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
   let message = '';
   let result = '';
   let success = '';

   try {
      result = await User.findById(req.session.userId);
      // Check if any field has a 'default' value
      if (result && result.lnumber == null) {
         return res.redirect('/g2-test/?param=Please update the information to access G page.'); // Redirect to g2-test page
      }
      res.render('g-test', { result: result, message: message, success: success });
   } catch (error) {
      console.log(error);
      message = "Error while fetching data.";
      res.render('g-test', { message: message, result: result });
   }
};