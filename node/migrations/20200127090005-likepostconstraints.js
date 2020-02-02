'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Likes', 'PostId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Posts',
            key: 'id'
          },
          onDelete: 'cascade'
        }),
        queryInterface.addColumn('Likes', 'UserId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'cascade'
        })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Likes', 'PostId'),
        queryInterface.removeColumn('Likes', 'UserId')
      ])
    })
  }
};
