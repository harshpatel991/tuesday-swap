const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/UserController');
const ContestController = require('./controllers/ContestController');
const EnrollmentController = require('./controllers/EnrollmentController');

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

app.route('/user/:userId').get(UserController.getUser);
app.route('/user').post(UserController.postUser);

app.route('/contest').post(ContestController.postContest);

app.route('/enrollment/:enrollmentSlug').get(EnrollmentController.getEnrollment);
app.route('/enrollment').post(EnrollmentController.postEnrollment);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});