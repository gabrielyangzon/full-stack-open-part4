const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        minLength : 3
    },
    name : String ,
    password : {
        type : String ,
        minLength: 3
    },
    blogs: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User' , userSchema)