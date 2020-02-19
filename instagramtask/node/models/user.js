'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: { type:DataTypes.STRING,unique:true},
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile:DataTypes.STRING,
    friendlist:DataTypes.STRING,
    acceptlist:DataTypes.STRING,
    userfriends:DataTypes.ARRAY(DataTypes.INTEGER),
    otpEnable:{type:DataTypes.BOOLEAN}
  }, {}); 
  User.associate = function(models) {
    User.hasMany(models.Otp);
    User.hasMany(models.Post);
    User.hasMany(models.Like);
    User.hasMany(models.Comment);
    User.hasMany(models.Replycomment);
    User.hasMany(models.Report);
  };
  return User;
};