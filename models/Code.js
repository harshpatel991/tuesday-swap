const Sequelize = require("sequelize");

const sequelize = require('../database/db');

module.exports = sequelize.define('Code',
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
        code: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        taken: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        takenBy: {
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
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