var bookshelf = require('../database/db');

module.exports = bookshelf.Model.extend({
    tableName: 'codes',
    hasTimestamps: true
});