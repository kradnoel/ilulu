'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resident = sequelize.define('Residents', {
    firstName: {allowNull: false, type: DataTypes.STRING},
    lastName: {allowNull: false, type: DataTypes.STRING},
    docNumber: {allowNull: false, type: DataTypes.STRING},
    birthDate: {allowNull: false, type: DataTypes.DATE},
    type: {allowNull: false, type: DataTypes.ENUM('OWNER', 'TENANT'), defaultValue: 'OWNER'},
  }, {});
  Resident.associate = function(models) {
    // associations can be defined here
    //Resident.belongsTo(models.Persons);
    Resident.belongsTo(models.Accounts);
    Resident.belongsTo(models.TypeDocuments);
  };
  return Resident;
};
