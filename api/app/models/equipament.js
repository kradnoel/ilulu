'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Equipament = sequelize.define('Equipaments', {
    description: { allowNull: false, type: DataTypes.STRING },
    code: { allowNull: false, unique: true, type: DataTypes.UUID },
    state: { allowNull: false, type: DataTypes.ENUM('DAMAGED', 'REPAIRING', 'GOOD'), defaultValue: 'GOOD' }
  }, {});

  Equipament.beforeCreate(async (equipament, options) => {
    const code = uuidv4();
    equipament.code = code;
  });

  Equipament.associate = function(models) {
    // associations can be defined here
  };
  return Equipament;
};
