const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const UserSchema = new Schema({
   fname: {
      type: String,
      default: null,
   },
   lname: {
      type: String,
      default: null
   },
   lnumber: {
      type: String,
      default: null,
   },
   age: {
      type: String,
      default: null
   },
   username: {
      type: String,
   },
   password: String,
   usertype: String,
   birthDate: {
      type: Date,
   },
   appointmentDate: {
      type: Date,
      default:null,
   },
   appointmentTime: {
      type:String,
      default:null,
   },
   examResult: {
      type:Boolean,
      default:false,
   },
   car_detail: {
      companyName: {
         type: String,
         default: null
      },
      modelName: {
         type: String,
         default: null
      },
      year: {
         type: Number,
         default: null
      },
      plateNumber: {
         type: String,
         default: null
      }
   }
})

UserSchema.pre('save', function (next) {

   const user = this
   bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash
      next()
   })

})

const userData = mongoose.model('User', UserSchema) //1st para (name of the Model) , 2nd para (name of the schema)

module.exports = userData  