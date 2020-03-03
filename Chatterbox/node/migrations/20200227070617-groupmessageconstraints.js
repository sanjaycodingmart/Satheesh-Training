'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Messages', 'GroupId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Groups',
            key: 'id'
          },
        }),
        queryInterface.addColumn('Messages', 'UserId', {
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
