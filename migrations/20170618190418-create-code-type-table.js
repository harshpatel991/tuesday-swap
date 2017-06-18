'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
          'CodeType',
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
              charset: 'UTF8',
              schema: 'public'
          }
      )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('CodeType')
  }
};
