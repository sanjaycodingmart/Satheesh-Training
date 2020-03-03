const Sequelize=require('sequelize');
const sequelize=new Sequelize('instagram','postgres','12341234',{
    host:"127.0.0.1",
    dialect:'postgres',
    operatorAliases:false
});
module.exports=sequelize;
