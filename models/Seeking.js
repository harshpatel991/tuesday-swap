var db = require('../database/db');
const CodeType = require('./CodeType');

module.exports = db.bookshelf.Model.extend({
    tableName: 'seekings',
    hasTimestamps: true,
    codeType: function() {
        return this.belongsTo(CodeType)
    }
});