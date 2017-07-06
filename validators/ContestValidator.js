function validatePostContest (req, res, next) {
    req.checkBody('name', 'Name cannot be empty').notEmpty();
    req.checkBody('description', 'Description cannot be empty').notEmpty();
    req.checkBody('end_at', 'End at must be date').isDate();

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
    validatePostContest
};