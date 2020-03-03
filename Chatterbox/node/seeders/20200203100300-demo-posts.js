'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Posts', [{
        content: 'firstpost',
        img_url: 'http://localhost:5003/images/uploads/myImage-1580371964100.jpeg',
        post_type: 'public',
        UserId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        content: 'secondpost',
        img_url: 'http://localhost:5003/images/uploads/myImage-1580371976330.jpeg',
        post_type: 'public',
        UserId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        content: 'thirdpost',
        img_url: 'http://localhost:5003/images/uploads/myImage-1580371991620.jpeg',
        post_type: 'public',
        UserId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
