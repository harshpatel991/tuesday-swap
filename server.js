const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const authHelpers = require('./auth/_helpers');
const expressValidator = require('express-validator');
const AuthValidator = require('./validators/auth-validator');
const ContestValidator = require('./validators/ContestValidator');
const EnrollmentValidator = require('./validators/EnrollmentValidator');
const CodeValidator = require('./validators/CodeValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdminController = require('./controllers/AdminController');
const ContestController = require('./controllers/ContestController');
const EnrollmentController = require('./controllers/EnrollmentController');
const User = require('./models/User');
const knexLogger = require('knex-logger');
const knex = require('./database/db').knex;
const helmet = require('helmet');

const app = express();

app.use(knexLogger(knex));
app.use(helmet());

// parse application/json
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    store: new FileStore({}),
    resave: false,
    saveUninitialized: false,
    cookie: {path: '/', httpOnly: true, secure: process.env.NODE_ENV === "production"}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.route('/auth/register').post(authHelpers.loginRedirect, AuthValidator.validatePostRegister, AuthController.postRegister);
app.route('/auth/login').post(authHelpers.loginRedirect, AuthValidator.validatePostLogin, AuthController.postLogin);
app.route('/auth/logout').get(AuthController.getLogout);

app.route('/user/verify').get(authHelpers.loginRequired, UserController.postVerifyRedditUsername);
app.route('/user').get(authHelpers.loginRequired, UserController.getUser);
app.route('/admin').get(authHelpers.loginRequired, authHelpers.adminRequired, AdminController.getAdmin);

app.route('/contest').post(authHelpers.loginRequired, authHelpers.adminRequired, ContestValidator.validatePostContest, ContestController.postContest);
app.route('/contest/:contestId/:contestSlug').get(ContestController.getContest);

app.route('/enrollment').post(authHelpers.loginRequired, EnrollmentValidator.validatePostEnrollment, CodeValidator.validatePostCode, EnrollmentController.postEnrollment);

app.listen(process.env.EXPRESS_PORT, function () {
    console.log('Example app listening on port ' + process.env.EXPRESS_PORT)
});

module.exports = app;