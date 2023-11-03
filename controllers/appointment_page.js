const User = require('../models/User');
const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    let message = req.query.param;
    try {
       const userId = req.session.userId;
       let result = await User.findById(userId);
      
     res.render("appointment", { result: result, message: message });
       
 
    } catch (error) {
       console.log(error)
    }
 }