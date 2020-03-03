'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.addColumn('Reports','UserId',{
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'cascade'
        }),
        queryInterface.addColumn('Reports','PostId',{
          type:Sequelize.INTEGER,
          references:{
            model:'Posts',
            key:'id'
          },
          onDelete: 'cascade'
        })
      ])
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.sequelize.transaction((t)=>{
     return Promise.all([
       queryInterface.removeColumn('Reports','UserId'),
       queryInterface.removeColumn('Reports','PostId')
     ])
   })
  }
};