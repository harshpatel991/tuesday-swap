const db = require('../database/db');
const Code = require('./Code');
const Seeking = require('./Seeking');
const User = require('./User');

module.exports = db.bookshelf.Model.extend({
    tableName: 'enrollments',
    user: function() {
        return this.belongsTo(User)
    },
    codes: function() {
        return this.hasMany(Code);
    },
    seekings: function() {
        return this.hasMany(Seeking)
    },
    hasTimestamps: true
});