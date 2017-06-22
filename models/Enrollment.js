var bookshelf = require('../database/db');

module.exports = bookshelf.Model.extend({
    tableName: 'enrollments',
    hasTimestamps: true
});