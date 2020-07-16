'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Residents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('OWNER', 'TENANT'),
        defaultValue: 'OWNER',
        allowNull: false
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      docNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      AccountId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      },
      TypeDocumentId: {
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
    return queryInterface.dropTable('Residents');
  }
};
