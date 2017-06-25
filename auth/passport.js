const passport = require('passport');
const User = require('../models/User');

module.exports = () => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.where('id', id).fetch()
            .then((user) => { done(null, user); })
            .catch((err) => { done(err,null); });
    });
};