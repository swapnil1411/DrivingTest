const User = require('../models/User');

module.exports = async (req, res, next) => {
   try {
      if (!loggedIn) {
         return res.redirect('/');
      } else {
         const user = await User.findById(req.session.userId);
        
         if (!user) {
            // Handle case where user data is not found
            return res.redirect('/');
         } else {
            if (user.usertype != 'Driver') {
               return res.render('appointment');
            }
         }
         next();
      }
   } catch (error) {
      console.log(error);
      // Handle any errors that occur during the process
      res.status(500).send('Internal Server Error');
   }
};
