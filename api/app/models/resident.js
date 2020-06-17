'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resident = sequelize.define('Residents', {
    type: {allowNull: false, type: DataTypes.ENUM('OWNER', 'TENANT'), defaultValue: 'OWNER'},
  }, {});
  Resident.associate = function(models) {
    // associations can be defined here
    Resident.belongsTo(models.Persons);
  };
  return Resident;
};