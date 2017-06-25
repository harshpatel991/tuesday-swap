var db = require('../database/db');

module.exports = db.bookshelf.Model.extend({
    tableName: 'contests',
    hasTimestamps: true
});