const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const options = {
    usernameField: 'email_address',
    passwordField: 'password',
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.where('id', id).fetch()
        .then((user) => { done(null, user); })
        .catch((err) => { done(err,null); });
});

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

passport.use(new LocalStrategy(options, (emailAddress, password, done) => {
    // Determine if the user exists and tell passport if it does
    User.where('email_address', emailAddress).fetch()
        .then((user) => {
            if (!user) {
                return done(null, false);
            } else if (!comparePass(password, user.get('password'))) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch((err) => {
            return done(err, false);
        }
    );
}));

module.exports = passport;