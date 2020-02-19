'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      name: 'Satheeshkumar',
      username: 'satheesh_99',
      mobile: '9843227718',
      email: '123satheesh99@gmail.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sivasundaranarayanan',
      username: 'siva_99',
      mobile: '09798669818',
      email: 'siva@gmail.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {
      name: 'kumar',
      username: 'kumar_99',
      mobile: '09728656752',
      email: 'siva@gmail.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
