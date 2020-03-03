'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('UserinGroups', 'GroupId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Groups',
            key: 'id'
          },
        }),
        queryInterface.addColumn('UserinGroups', 'UserId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
        })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Messages', 'GroupId'),
        queryInterface.removeColumn('Messages', 'UserId')
      ])
    })
  }
};
