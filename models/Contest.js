var db = require('../database/db');
const Enrollment = require('./Enrollment');
const CodeType = require('./CodeType');

module.exports = db.bookshelf.Model.extend({
    tableName: 'contests',
    hasTimestamps: true,
    enrollments: function() {
        return this.hasMany(Enrollment)
    },
    codeTypes: function () {
        return this.hasMany(CodeType)
    }
});