'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users','userfriends',
    Sequelize.ARRAY(Sequelize.INTEGER)
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users','userfriends');
  }
};
