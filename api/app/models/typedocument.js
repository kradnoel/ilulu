'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeDocument = sequelize.define('TypeDocuments', {
    type: {type: DataTypes.STRING, allowNull: false, unique: true}
  }, {});
  TypeDocument.associate = function(models) {
    // associations can be defined here
  };
  return TypeDocument;
};
