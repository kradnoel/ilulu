'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operator = sequelize.define('Operators', {
    firstName: {allowNull: false, type: DataTypes.STRING},
    lastName: {allowNull: false, type: DataTypes.STRING},
    docNumber: {allowNull: false, type: DataTypes.STRING},
    birthDate: {allowNull: false, type: DataTypes.DATE},
  }, {});
  Operator.associate = function(models) {
    // associations can be defined here
    Operator.belongsTo(models.Accounts);
    Operator.belongsTo(models.TypeDocuments);
  };
  return Operator;
};
