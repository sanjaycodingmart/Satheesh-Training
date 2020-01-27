const Users = require('../models').User;

const User = () => {

}
User.createUser = async (body) => {
    try {
        let promise = await Users.create({
            name: body.name,
            username: body.username,
            mobile: body.mobile,
            email: body.email,
            password: body.Password
        })
        console.log("validation", promise)
        return (promise)
    }
    catch (e) {
        console.log('error')
        return e
    }
}
User.getUser = (body) => {
    let { username, password } = body
    let response = Users.findOne({
        attributes: ['id'],
        where: {
            username, password
        }
    })
    return response;
}
User.getName=(id)=>{
    let response=Users.findOne({
        attributes:['username'],
        where:{
            id
        }
    })
    return response;
}
module.exports = User;
