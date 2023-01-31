const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require('cors')

const middleware = require("./utils/middleware")

const logger = require("./utils/logger")
const blogRouter = require("./controller/blogController")




app.get("/", (request,response) => {
    response.send({ message :"hello app" })
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

//api for blogs
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app