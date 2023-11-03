const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
    
    date:{
        type:Date,
        default:null
    },
    time:{
        type:String,
        default:null
    },
    isTimeSlotAvailaible:{
        type:Boolean,
        default:false
    }
  
})



const appointmentData = mongoose.model('Appointment', AppointmentSchema) //1st para (name of the Model) , 2nd para (name of the schema)

module.exports = appointmentData  