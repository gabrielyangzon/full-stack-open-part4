const config = require("./utils/config")
const express = require("express")
require('express-async-errors')
const app = express()
const cors = require('cors')

const mongoose = require("mongoose")

const middleware = require("./utils/middleware")

const logger = require("./utils/logger")
const blogRouter = require("./controller/blogController")
const userRouter = require("./controller/userController")
const loginRouter = require("./controller/loginController");

app.get("/", (request,response) => {
    response.send({ message :"hello app" })
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)


logger.info("connecting to mongodb..")
mongoose.connect(config.MONGODB_URL)
  .then(() => logger.info('connected to mongo db'))
  .catch((error) => logger.error(error))

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
//api for blogs
app.use('/api/blogs', blogRouter)

//api for users
app.use('/api/users' , userRouter)

//api for login
app.use('/api/login' , loginRouter)



app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app