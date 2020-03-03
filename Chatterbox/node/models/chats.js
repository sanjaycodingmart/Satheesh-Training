'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define('Chats', {
    senderId: DataTypes.STRING,
    Messages: DataTypes.STRING,
    ReceiverId: DataTypes.STRING
  }, {});
  Chats.associate = function(models) {
    // associations can be defined here
  };
  return Chats;
};