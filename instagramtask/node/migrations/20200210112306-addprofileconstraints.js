'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn('Users','profile',
          Sequelize.STRING
       );
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users','profile');
  }
};
