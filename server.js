const express = require('express');
const bodyParser = require('body-parser');
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
        User.where('id', req.params.userId).fetch()
            .then(function (user) {
                if (user) {
                    res.send(user);
                } else {
                    //TODO: redirect away
                    res.send("bye bye");
                }
            }).catch(function (err) {
            console.error(err);
        });
    });

app.route('/user')
    .post(function (req, res) {
        //TODO: check if not logged in
        //TODO: validation

        new User({
            email_address: 'ipod998@gmail.com',
            password: "123456", //TODO: get from req.body
            reddit_username: "deadfire55", //TODO: get from req.body
            is_reddit_verified: true //TODO: get from somewhere
        })
            .save().then(user => {
                res.send("saved user");
            })
            .catch(error => {
                res.send("failed user" + error);
            });

    });

app.route('/contest')
    .post(function (req, res) {
        //TODO: authentication, allow only admins
        //TODO: validation

        new Contest({
            name: 'Tmobile Tuesday 7/16',
            description: "Trade your tmobile codes for the week of 7/16", //TODO: get from req.body
            end_at: new Date() //TODO: fill in
        })
            .save().then(contest => {
                res.send("saved contest");
            })
            .catch(error => {
                res.send("failed contest" + error);
            });
    });

app.route('/enrollment/:enrollmentSlug')
    .get(function (req, res) {

        Enrollment.where('slug', req.params.enrollmentSlug).fetch()
            .then(function (enrollment) {
                if (enrollment) {
                    res.send(enrollment);
                } else {
                    //TODO: redirect away
                    res.send("bye bye");
                }
            }).catch(function (err) {
                console.error(err);
            });

        //TODO: get codes
        //TODO: get seeking
    });

app.route('/enrollment')
    .post(function (req, res) {
        //TODO: do validation
        //TODO: authenticate the user

        new Enrollment({
            slug: 'randomSlug1',
            user_id: 1, //TODO: get from req.body
            contest_id: 1, //TODO: get from req.body
            should_give_away_codes: true //TODO: get from req.body
        })
            .save().then(enrollment => {
                res.send("saved enrollment");
            })
            .catch(error => {
                res.send("failed" + error);
            });

        //TODO: insert codes into database
        //TODO: insert seeking into database
    });

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});