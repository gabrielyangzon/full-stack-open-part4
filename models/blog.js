const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

logger.info("connecting to mongodb..")
mongoose.connect(config.MONGODB_URL)
  .then(() => logger.info('connected to mongo db'))
  .catch((error) => logger.error(error))
    
const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Blog" , blogSchema)
