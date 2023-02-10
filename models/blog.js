const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: String,
    likes: {
      type : Number,
      required : true
    },
    user : String
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Blog" , blogSchema)
