const Sequelize = require("sequelize");
const sequelize = require('../database/db');

module.exports = sequelize.define('Contest',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        endAt: {
            type: Sequelize.DATE
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
    {
        freezeTableName: true,
    }
);