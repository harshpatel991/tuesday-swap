const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const User = require('./models/User');
const Contest = require('./models/Contest');
const Enrollment = require('./models/Enrollment');

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
});

app.route('/user/:userId')
    .get(function (req, res) {
        res.send('Get a user' + req.params.userId);
    });

app.route('/user')
    .post(function (req, res) {
        //TODO: check if not logged in
        //TODO: validation

        User.build({
            emailAddress: 'ipod998@gmail.com',
            password: "123456", //TODO: get from req.body
            redditUsername: "deadfire55", //TODO: get from req.body
            isRedditVerified: true //TODO: get from somewhere
        })
            .save()
            .then(anotherTask => {
                // you can now access the currently saved task with the variable anotherTask... nice!
                res.send("saved user");
            })
            .catch(error => {
                // Ooops, do some error-handling
                res.send("failed user" + error);
            })

    });

app.route('/contest')
    .post(function (req, res) {
        //TODO: authentication, allow only admins
        //TODO: validation

        Contest.build({
            name: 'Tmobile Tuesday 7/16',
            description: "Trade your tmobile codes for the week of 7/16", //TODO: get from req.body
            endAt: new Date() //TODO: fill in
        })
            .save()
            .then(anotherTask => {
                // you can now access the currently saved task with the variable anotherTask... nice!
                res.send("saved contest");
            })
            .catch(error => {
                // Ooops, do some error-handling
                res.send("failed contest" + error);
            })

    });

app.route('/enrollment/:enrollmentSlug')
    .get(function (req, res) {
        Enrollment.find({
            where: {
                slug: req.params.enrollmentSlug
            }
        }).then(enrollment => {
            if (enrollment) {
                res.send('Found enrollment for id: ' + req.params.enrollmentSlug + enrollment);
            } else {
                //TODO: redirect away
                res.send("bye bye");
            }
        })


        //TODO: get codes
        //TODO: get seeking
    });

app.route('/enrollment')
    .post(function (req, res) {
        //TODO: do validation
        //TODO: authenticate the user

        Enrollment.build({
            slug: 'randomSlug1',
            userId: 1, //TODO: get from req.body
            contestId: 1, //TODO: get from req.body
            shouldGiveAwayCodes: true //TODO: get from req.body
        })
            .save()
            .then(anotherTask => {
                // you can now access the currently saved task with the variable anotherTask... nice!
                res.send("saved");
            })
            .catch(error => {
                // Ooops, do some error-handling
                res.send("failed" + error);
            })

        //TODO: insert codes into database
        //TODO: insert seeking into database
    });

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});