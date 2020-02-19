'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Replycomments', 'CommentId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Comments',
            key: 'id'
          },
          onDelete: 'cascade'
        }),
        queryInterface.addColumn('Replycomments', 'UserId', {
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
        queryInterface.removeColumn('Replycomments', 'CommentId'),
        queryInterface.removeColumn('Replycomments', 'UserId')
      ])
    })
  }
};
