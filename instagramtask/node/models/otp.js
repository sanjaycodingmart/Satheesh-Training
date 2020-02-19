'use strict';
module.exports = (sequelize, DataTypes) => {
  const Otp = sequelize.define('Otp', {
    otp: DataTypes.STRING,
    flag:DataTypes.STRING
  }, {});
  Otp.associate = function(models) {
    Otp.belongsTo(models.User);
  };
  return Otp;
};