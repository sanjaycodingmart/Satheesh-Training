'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    } 
  }, {
    timestamps:false
  });
  Like.associate = function(models) {
    Like.belongsTo(models.Post);
    Like.belongsTo(models.User);
  };
  return Like;
};