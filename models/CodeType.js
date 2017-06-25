var db = require('../database/db');

module.exports = db.bookshelf.Model.extend({
    tableName: 'code_types',
    hasTimestamps: true
});