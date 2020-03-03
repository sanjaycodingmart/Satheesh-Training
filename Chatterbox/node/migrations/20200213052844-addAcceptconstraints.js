'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users','acceptlist',
    Sequelize.STRING
  );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users','acceptlist');
  }
};
