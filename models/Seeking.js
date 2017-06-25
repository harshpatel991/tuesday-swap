var db = require('../database/db');

module.exports = db.bookshelf.Model.extend({
    tableName: 'seekings',
    hasTimestamps: true
});