var bookshelf = require('../database/db');

module.exports = bookshelf.Model.extend({
    tableName: 'contests',
    hasTimestamps: true
});