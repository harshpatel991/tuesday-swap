var bookshelf = require('../database/db');

module.exports = bookshelf.Model.extend({
    tableName: 'code_types',
    hasTimestamps: true
});