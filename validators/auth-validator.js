function validatePostRegister (req, res, next) {
    req.checkBody('email_address', 'Email address cannot be empty').notEmpty();
    req.checkBody('email_address', 'Email address should be a valid email').isEmail();
    req.checkBody('password', 'Password must be at least 6 characters').isLength(6);
    req.checkBody('password_confirm', 'Passwords must match').equals(req.body.password);
    req.checkBody('reddit_username', 'Reddit username cannot be empty').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            message: 'Validation failed',
            failures: errors
        });
    } else {
        return next();
    }
}

function validatePostLogin (req, res, next) {
    req.checkBody('email_address', 'Email address cannot be empty').notEmpty();
    req.checkBody('email_address', 'Email address should be a valid email').isEmail();
    req.checkBody('password', 'Password cannot be be empty').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            message: 'Validation failed',
            failures: errors
        });
    } else {
        return next();
    }
}

module.exports = {
    validatePostRegister,
    validatePostLogin
};