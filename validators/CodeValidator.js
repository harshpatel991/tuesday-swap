function validatePostCode (req, res, next) {
    const codeObjects = req.body.codes;
    let errors = [];


    Code.where({contest_id: req.body.contest_id}).fetchAll({columns: ['id']})
        .then(codes => {
            let suppliedCodeTypeIds = [];
            codeObjects.forEach(function(codeObjects, index) {
                const codeTypeId = codeObjects.code_type_id;
                const code = codeObjects.code;

                if (!code || !Number.isInteger(codeTypeId)) {
                    errors.push("Index: " + index + ": Code Type Id should be an integer")
                } else {
                    suppliedCodeTypeIds.push(codeTypeId)
                }

                if (!code) {
                    errors.push("Index: " + index + ": Code should not be empty")
                }
            });

            console.log("It contains: " + codes.contains(suppliedCodeTypeIds));


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

        })
}

module.exports = {
    validatePostCode
};