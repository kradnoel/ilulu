'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visitor = sequelize.define('Visitors', {
    fullName: {allowNull: false, type: DataTypes.STRING},
    docNumber: {allowNull: false, type: DataTypes.STRING},
    entryDate: {allowNull: false, type: DataTypes.DATE }
  }, {});
  Visitor.associate = function(models) {
    // associations can be defined here
    Visitor.belongsTo(models.TypeDocuments);
  };
  return Visitor;
};
