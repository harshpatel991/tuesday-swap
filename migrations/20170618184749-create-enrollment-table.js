'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
          'Enrollment',
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
              charset: 'UTF8',
              schema: 'public'
          }
      )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Enrollment')
  }
};
