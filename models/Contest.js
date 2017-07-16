var db = require('../database/db');
const Enrollment = require('./Enrollment');

module.exports = db.bookshelf.Model.extend({
    tableName: 'contests',
    hasTimestamps: true,
    enrollments: function() {
        return this.hasMany(Enrollment)
    },
});