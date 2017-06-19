const Sequelize = require("sequelize");

const sequelize = require('../database/db');

module.exports = sequelize.define('User',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emailAddress: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        redditUsername: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        isRedditVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
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