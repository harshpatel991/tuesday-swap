var config = require('../knexfile.js');
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports.knex = require('knex')(config[env]);
module.exports.bookshelf = require('bookshelf')(module.exports.knex);