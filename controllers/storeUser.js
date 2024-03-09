// Model Files
const User = require('../models/User');

module.exports = async (req, res) => {
   try {
      const email = req.body.email;
      console.log("🚀 ~ module.exports= ~ email:", email.length)
      const password = req.body.password;
      console.log("🚀 ~ module.exports= ~ password:", password)
      const cpassword = req.body.cpassword;
      console.log("🚀 ~ module.exports= ~ cpassword:", cpassword)
      const usertype = req.body.usertype;
      console.log("🚀 ~ module.exports= ~ usertype:", usertype)

      // Check if any required fields are empty
      if (email.length == 0 || password.length ==0 || cpassword.length ==0  || usertype == "Please select user type") {
         const message = 'Please fill in all the required fields.';
         return res.render("signup", { message: message });
      }

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
         const message = 'Passwords do not match.';
         res.render("signup", { message: message, userData: userData });
      }
   } catch (error) {
      console.log(error)
   }
}
