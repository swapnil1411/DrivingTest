
const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    console.log("🚀 ~ file: appointment_post.js:5 ~ module.exports= ~ req:", req)
    
    let message = req.query.param;
    try {
      const date = req.body.appointmentDate;
    
      const time = req.body.appointmentTime;
     
     let appointment = await Appointment.findOne({date:date,time:time});
     if(appointment){
        console.log("already exists");
     }
     else{
        Appointment.create({
            date:date,
            time:time,
            isTimeSlotAvailaible:true
        })
       
        res.render('dashboard');
     }
      
    //  res.render("appointment", { result: result, message: message });
       
 
    } catch (error) {
       console.log(error)
    }
 }