const Sequelize = require("sequelize");

const sequelize = require('../database/db');

module.exports = sequelize.define('Enrollment',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        slug: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
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
        shouldGiveAwayCodes: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
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