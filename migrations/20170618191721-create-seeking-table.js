'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
          'Seeking',
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
              charset: 'UTF8',
              schema: 'public'
          }
      )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Seeking')
  }
};
