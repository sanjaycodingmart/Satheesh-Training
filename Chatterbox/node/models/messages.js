'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    Message: DataTypes.STRING
  }, {});
  Messages.associate = function(models) {
    // associations can be defined here
    Messages.belongsTo(models.User);
    Messages.belongsTo(models.Group);
    // Messages.belongsTo(models.UserinGroups)
  };
  return Messages;
};