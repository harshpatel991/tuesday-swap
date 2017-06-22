const Contest = require('../models/Contest');

module.exports.postContest = function (req, res) {
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
};