const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const User = require('../models/User');
const authHelpers = require('./_helpers');

const options = {
    usernameField: 'email_address',
    passwordField: 'password'};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
    // check to see if the username exists
    User.where( 'email_address', username).fetch()
        .then((user) => {
            if (!user) {
                return done(null, false);
            }

            if (!authHelpers.comparePass(password, user.get('password'))) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch((err) => {
           return done(err);
        }
    );
}));

module.exports = passport;