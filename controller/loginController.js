const jwt = require('jsonwebtoken')
const bcrpyt = require('bcrypt')
const loginRouter = require('express').Router()

const User = require('../models/users')
const config = require('../utils/config')

loginRouter.post('/' , async (request, response) => {

    const {username , password} = request.body

    const user = await User.findOne({username})

    const passwordCorrect = user === null
        ? false
        : await bcrpyt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(
        userForToken,
        config.SECRET ,
        { expiresIn : 60 * 60 } )

    response
        .status(200)
        .send({ token,
            username: user.username,
            name: user.name
        })
})

module.exports = loginRouter