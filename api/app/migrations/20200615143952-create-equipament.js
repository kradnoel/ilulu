'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Equipaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
      	allowNull: false,
        type: Sequelize.STRING
      },
      code: {
      	allowNull: false,
      	type: Sequelize.STRING
      },
      state: {
      	allowNull: false,
      	type: Sequelize.ENUM('DAMAGED', 'REPAIRING', 'GOOD'),
        defaultValue: 'GOOD',
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
    return queryInterface.dropTable('Equipaments');
  }
};