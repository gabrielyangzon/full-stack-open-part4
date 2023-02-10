const User = require('../../models/users')


const initialUser = [
    {
        username : "gabsue" ,
        name : "gabriel" ,
        password : "1234"
    },
    {
        username : "gabsue1" ,
        name : "gabriel1" ,
        password : "12345"
    }]

const usersInDb = async () => {
     const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
     usersInDb,
    initialUser
}