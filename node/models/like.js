'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    likeid: DataTypes.INTEGER
  }, {
    timestamps:false
  });
  Like.associate = function(models) {
    Like.belongsTo(models.Post);
    Like.belongsTo(models.User);
  };
  return Like;
};