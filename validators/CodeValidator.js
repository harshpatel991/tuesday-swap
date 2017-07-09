const CodeType = require("../models/CodeType");

function validatePostCode (req, res, next) {
    const codeObjects = req.body.codes;
    const seekingObjects = req.body.seeking;
    let errors = [];

    if(codeObjects.length === 0) {
        return res.status(400).json({
            message: 'Validation failed',
            failures: ["Must submit at least one code"]
        });
    }

    CodeType.where({contest_id: req.body.contest_id}).fetchAll({columns: ['id']})
        .then(codes => {
            let suppliedCodeTypeIds = [];
            codeObjects.forEach(function(codeObjects, index) {
                const codeTypeId = codeObjects.code_type_id;
                const code = codeObjects.code;

                if (!codeTypeId || !Number.isInteger(codeTypeId)) {
                    errors.push("Index: " + index + ": Code Type Id should be an integer")
                } else if (!code) {
                    errors.push("Index: " + index + ": Code must be supplied")
                } else {
                    suppliedCodeTypeIds.push(codeTypeId)
                }
            });
            if (!suppliedCodeTypeIds.every(function(val) {
                    return codes.pluck("id").indexOf(val) >= 0;
                }) ) {
                errors.push("Found a Code Type Id does that not belong to this contest")
            }

            let suppliedSeekingCodeTypeIds = [];
            seekingObjects.forEach(function (seekingCodeTypeId, index) {
                if(!seekingCodeTypeId || !Number.isInteger(seekingCodeTypeId)) {
                    errors.push("Seeking Index: " + index + ": Code Type Id should be an integer")
                } else {
                    suppliedSeekingCodeTypeIds.push(seekingCodeTypeId)
                }
            });
            if (!suppliedSeekingCodeTypeIds.every(function(val) {
                    return codes.pluck("id").indexOf(val) >= 0;
                }) ) {
                errors.push("Found a Seeking Code Type Id does that not belong to this contest")
            }

            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Validation failed',
                    failures: errors
                });
            } else {
                return next();
            }

        })
        .catch(err => {
            return res.status(400).json({
                message: 'Validation failed',
                failures: "Validation database error" + err
            });
        })
}

module.exports = {
    validatePostCode
};