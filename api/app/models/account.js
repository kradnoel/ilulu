'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Accounts', {
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    role: {type: DataTypes.ENUM('ADMIN', 'NORMAL'), defaultValue: 'NORMAL', allowNull: false}
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};
