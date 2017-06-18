const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next){
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
    })
    .post(function (req, res) {
        //TODO: validation
        res.send('Add a user')
        //TODO: insert
    });

app.route('/enrollment/:enrollmentSlug')
    .get(function (req, res) {
        res.send('Get an application ' + req.params.enrollmentSlug);

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        //TODO: get application
        //TODO: get codes
        //TODO: get seeking
    })
    .post(function (req, res) {
        //TODO: do validation
        //TODO: authenticate the user

        // var createTimestamp = Date();
        // var lastUpdateTimestamp = Date();
        // var slug = "blah";
        // var application = { req.body.userId, req.body.contestId, req.body.shouldGiveAwayCodes, createTimestamp, lastUpdateTimestamp}
        // var codes = {};
        // var seeking = {};

        //TODO: insert into database
    });

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});