'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Persons', {
    firstName: {allowNull: false, type: DataTypes.STRING},
    lastName: {allowNull: false, type: DataTypes.STRING},
    docNumber: {allowNull: false, type: DataTypes.STRING},
    birthDate: {allowNull: false, type: DataTypes.DATE},
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
    Person.belongsTo(models.TypeDocuments);
    Person.belongsTo(models.Accounts);
  };
  return Person;
};
