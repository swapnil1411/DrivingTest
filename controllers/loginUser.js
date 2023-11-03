const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
   let success = req.query.param;
   let message = '';
   
   const { username, password } = req.body;

   try {
      const user = await User.findOne({ username: username });

      if (user) {
         const same = await bcrypt.compare(password, user.password);

         if (same) {
            // Password is correct, redirect to the home page
            req.session.userId = user._id
            return res.redirect('/');
         } else {
            message = "Please enter correct password!";
         }
      } else {
         message = "Please enter valid username!";
      }

      // Render the login page with the appropriate message
      res.render('login', { message: message, success: success });

   } catch (error) {
      console.log(error);
      res.redirect('/user/login');
   }
};