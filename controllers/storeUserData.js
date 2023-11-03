// Model Files
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

   //Send data to database
   try {
      const user = req.session.userId;
      const licensePattern = /^[A-Za-z0-9]{6}$/;
   
      console.log("🚀 ~ file: storeUserData.js:12 ~ module.exports= ~  req.body:",  req.body)
      const { fname, lname, lnumber, age,date,time, birthDate, companyName, modelName, year, plateNumber } = req.body;

      // Check for empty or null values in any field
      for (const field of [fname, lname, lnumber, age, birthDate,date,time, companyName, modelName, year, plateNumber]) {
         if (field === undefined || field === null || field.trim() === '') {
            return res.redirect("/g2-test/?param=Please enter all required data");
         }else if(!lnumber.match(licensePattern)){
            return res.redirect("/g2-test/?param=Please enter valid 6 digit license number !");
         }
      }

      const newRecord = await User.findOneAndUpdate(
         { _id: user },
         {
            'fname': fname,
            'lname': lname,
            'lnumber': lnumber,
            'age': age,
            'appointmentDate':date,
            'appointmentTime':time,
            'birthDate': birthDate,
            
            'car_detail.companyName': companyName,
            'car_detail.modelName': modelName,
            'car_detail.year': year,
            'car_detail.plateNumber': plateNumber
         },
         { new: true }
      );

      const appointmentDone = await Appointment.findOneAndUpdate({date:date,time:time},{ $set:{isTimeSlotAvailaible:false}}, {new: true});
      console.log("🚀 ~ file: storeUserData.js:45 ~ module.exports= ~ appointmentDone:", appointmentDone);

      if (newRecord) {
         res.redirect("/g-test/?param=Successfully Updated");
      } else {
         res.render("dashboard", { err: "Error updating G2 data." });
      }
   }
   catch (error) {
      console.log(error)
   }
}