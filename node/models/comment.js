'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING
  }, { timestamps:false});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);
    Comment.hasMany(models.Replycomment);
  };
  return Comment;
};