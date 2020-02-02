'use strict';
module.exports = (sequelize, DataTypes) => {
  const Replycomment = sequelize.define('Replycomment', {
    reply:DataTypes.STRING
  }, {timestamps:false});
  Replycomment.associate = function(models) {
    Replycomment.belongsTo(models.User)
    Replycomment.belongsTo(models.Comment)
  };
  return Replycomment;
};
