'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserinGroups = sequelize.define('UserinGroups', {
    // key: DataTypes.STRING
  }, {});
  UserinGroups.associate = function(models) {
    // associations can be defined here
    UserinGroups.belongsTo(models.User);
    UserinGroups.belongsTo(models.Group);
  };
  return UserinGroups;
};