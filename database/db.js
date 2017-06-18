const Sequelize  = require("sequelize");

module.exports = new Sequelize('todo', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});