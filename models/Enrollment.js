const db = require('../database/db');
const Code = require('./Code');
const Seeking = require('./Seeking');

module.exports = db.bookshelf.Model.extend({
    tableName: 'enrollments',
    codes: function() {
        return this.hasMany(Code);
    },
    seekings: function() {
        return this.hasMany(Seeking)
    },
    hasTimestamps: true
});