// Model Files
const User = require('../models/User');

module.exports = async (req, res) => {
   let message = '';
   let result = '';
   let success = '';

   try {
      result = await User.findById(req.session.userId);
      if (result) {
         res.render('g-test', { result: result, message: message, success: success });
      } else {
         message = "This license Number does not exist!";
         res.render('g-test', { message: message, result: result });
      }
   } catch (error) {
      console.log(error);
      message = "Error while fetching data.";
      res.render('g-test', { message: message, result: result });
   }
};
