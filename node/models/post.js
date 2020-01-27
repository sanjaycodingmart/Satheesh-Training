'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    img_url: DataTypes.STRING,
    post_type: DataTypes.STRING,
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User)
  };
  return Post;
};
