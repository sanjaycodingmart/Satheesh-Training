'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
  }, {timestamps:false});
  Report.associate = function(models) {
    Report.belongsTo(models.User);
    Report.belongsTo(models.Post);
  };
  return Report;
};