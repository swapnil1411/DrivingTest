// Model Files
const User = require('../models/User');

module.exports = async (req, res) => {
   try {
      const email = req.body.email;
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      const usertype = req.body.usertype;

      const userData = {
         username: email,
         password: password,
         usertype: usertype
      }

      // Check if the email (username) already exists in the database
      const existingUser = await User.findOne({ username: email });
      if (existingUser) {
         return res.redirect("/user/register/?param=Email is already taken. Please choose a different email.");
      }

      if (password === cpassword) {

         const user = await User.create(userData)
         res.redirect("/user/login/?param=Successfully Registered ! Please LogIn Here .");

      } else {
         const message = 'Passwords are not matched .';
         res.render("signup", { message: message, userData: userData });
      }
   } catch (error) {
      console.log(error)
   }
}