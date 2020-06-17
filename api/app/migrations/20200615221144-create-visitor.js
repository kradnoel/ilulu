'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Visitors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      docNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      entryDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      typeDocumentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TypeDocuments',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Visitors');
  }
};
