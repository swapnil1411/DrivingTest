const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  const currentDate = req.query.appointment_date;

  if (!currentDate) {
    return res.send({ message: "Something went wrong" });
  }

  // get available appointments only
  // const appointments = await Appointment.find({

  // });
  const appointments = await Appointment.find({
    date: currentDate,

    isTimeSlotAvailaible: true,
  });

  if (appointments.length > 0) {
    res.send({ data: appointments });
  } else {
    res.send({ message: "No Appointments" });
  }
};
