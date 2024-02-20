const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const expressSession = require('express-session');

//Database Connection
mongoose.connect('mongodb+srv://swapnilnanavati81:Swapnil%4020@cluster0.wboggmb.mongodb.net/?retryWrites=true&w=majority')
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

global.loggedIn = null;

app.use("*", (req, res, next) => {
   
   loggedIn = req.session.userId;
   next()
});

global.isDriver = null;

app.use("*", async (req, res, next) => {
   try {
      const user = await User.findById(req.session.userId);
      isDriver = user && user.usertype === 'Driver';
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

app.use((req, res) => res.render('notfound'));