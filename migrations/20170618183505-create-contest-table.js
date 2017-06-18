'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
          'Contest',
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
              charset: 'UTF8',
              schema: 'public'
          }
      )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Contest')
  }
};
