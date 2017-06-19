const Sequelize = require("sequelize");

const sequelize = require('../database/db');

module.exports = sequelize.define('CodeType',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contestId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Contest',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        name: {
            type: Sequelize.STRING(255),
        },
        image: {
            type: Sequelize.STRING(255),
        },
        description: {
            type: Sequelize.STRING(500),
        },
        instructions: {
            type: Sequelize.STRING(500),
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