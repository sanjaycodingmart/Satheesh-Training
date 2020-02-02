'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    img_url: DataTypes.STRING,
    post_type: DataTypes.STRING,
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, { onDelete: 'CASCADE' });
    Post.hasMany(models.Like, { onDelete: 'CASCADE' });
    Post.hasMany(models.Comment, { onDelete: 'CASCADE' });
    Post.hasMany(models.Report,{onDelete:'CASCADE'});
  };
  return Post;
};
