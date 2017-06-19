const Sequelize = require("sequelize");

const sequelize = require('../database/db');

module.exports = sequelize.define('Seeking',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        enrollmentId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Enrollment',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        codeTypeId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'CodeType',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        numTimesSatisfied: {
            type: Sequelize.INTEGER,
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