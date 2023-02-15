const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()

const User = require('../models/users')

userRouter.get('/' , async(request , response)=>{
    const users = await User.find({}).populate('blogs')

    response.status(200).json(users)
})

userRouter.post('/' , async (request , response) => {
    const {username , name , password} = request.body

    if(password.length < 3 )
    {
        return response.status(401).json({error : "password must be atleast 3 characters long"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password , saltRounds)

    const user = new User({
       username : username ,
       name : name ,
       password : passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})


module.exports = userRouter