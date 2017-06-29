const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const authHelpers = require('./auth/_helpers');
const expressValidator = require('express-validator');
const authValidator = require('./validators/auth-validator');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdminController = require('./controllers/AdminController');
const ContestController = require('./controllers/ContestController');
const EnrollmentController = require('./controllers/EnrollmentController');

const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

app.route( '/auth/register').post(authHelpers.loginRedirect, authValidator.validatePostRegister, AuthController.postRegister);
app.route('/auth/login').post(authHelpers.loginRedirect, authValidator.validatePostLogin, AuthController.postLogin);
app.route('/auth/logout').get(authHelpers.loginRequired, AuthController.getLogout);

app.route('/user').get(authHelpers.loginRequired, UserController.getUser);
app.route('/admin').get(authHelpers.adminRequired, AdminController.getAdmin);

app.route('/contest').post( ContestController.postContest);

app.route('/enrollment/:enrollmentSlug').get( EnrollmentController.getEnrollment);
app.route('/enrollment').post( EnrollmentController.postEnrollment);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});

module.exports = app;