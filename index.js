const express = require('express')
const path = require('path')
const ejs = require('ejs')
require('dotenv').config()
const mongoose = require('mongoose');
const expressSession = require('express-session');

//Database Connection
mongoose.connect(process.env.DB_URL)
//change uname $pasword and enter database name

// Model Files
const User = require('./models/User')
const Appointment = require('./models/Appointment');

// Controller Files
const HomeController = require('./controllers/home');
const LogInController = require('./controllers/login');
const LogInUserController = require('./controllers/loginUser');
const SignUpController = require('./controllers/signup');
const StoreUserController = require('./controllers/storeUser');
const G2TestController = require('./controllers/g2_test');
const GTestController = require('./controllers/g_test');
const StoreUserDataController = require('./controllers/storeUserData');
const FindUserDataController = require('./controllers/findUserData');
const UpdateUserDataController = require('./controllers/updateUserData');
const LogOutController = require('./controllers/logout');
const AppointmentController = require('./controllers/appointment_page');
const AppointmentDateController = require('./controllers/appointment_post');
const AppointmentUserController = require('./controllers/appointment_user');
const AppointmentExamController = require('./controllers/appointment_exam');
const AppointmentExamDataController = require('./controllers/appointment_exam_data');
// define middleware
// const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const validationMiddleware = require('./middleware/validationMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded())

app.listen(4000, () => {
   console.log('App is listening on port 4000')
})

// express session middleware
app.use(expressSession({
   secret: "Drivers App"
}))



app.use("*",async (req, res, next) => {
   const user = await User.findById(req.session.userId);
  
   loggedIn = req.session.userId;
   next()
});


global.user =null;

app.use("*", async (req, res, next) => {
   try {
      const tempuser = await User.findById(req.session.userId);
     
      user= tempuser;
      console.log("🚀 ~ app.use ~ user:", user)
      
   } catch (error) {
      // Handle the error if User.findById() fails
      console.error('Error while fetching user data:', error);
      isDriver = false; // Assuming non-driver if there's an error
   }
   next();
});


// Routes
app.get('/', HomeController)

app.get('/user/login', redirectIfAuthenticatedMiddleware, LogInController)

app.post('/auth/login', redirectIfAuthenticatedMiddleware, LogInUserController)

app.get('/user/register', redirectIfAuthenticatedMiddleware, SignUpController)

app.post('/auth/register', redirectIfAuthenticatedMiddleware, StoreUserController)

app.get('/g2-test', authMiddleware, G2TestController)

app.post('/userData/store', authMiddleware, StoreUserDataController)

app.post('/userData/store', authMiddleware, StoreUserDataController)

app.get('/g-test', authMiddleware, GTestController)

app.post('/g-test', authMiddleware, FindUserDataController);

app.post('/g-test/update/:license', authMiddleware, UpdateUserDataController)

app.get('/auth/logout', LogOutController)

app.get('/appointment',authMiddleware, AppointmentController);

app.post('/appointment/date', AppointmentDateController);

app.get('/appointment/dates',AppointmentUserController);

app.get('/appointment/exam', AppointmentExamController);

app.post('/appointment/exam', AppointmentExamDataController);

app.use((req, res) => res.render('notfound'));