'use strict';
module.exports = (sequelize, DataTypes) => {
  const Breakdown = sequelize.define('Breakdown', {
    type: DataTypes.STRING
  }, {});
  Breakdown.associate = function(models) {
    // associations can be defined here
    Breakdown.belongsTo(models.Equipaments);
    Breakdown.belongsTo(models.Residents);
  };
  return Breakdown;
};