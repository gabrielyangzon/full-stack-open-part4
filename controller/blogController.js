const blogRouter = require('express').Router()

const blog = require('../models/blog')
const Blog = require('../models/blog')


blogRouter.get("/" , ( require, response , next ) => {
  Blog
   .find({})
   .then(blogs => {
      if(blogs){
       response.status(200).json(blogs)
      }else{
       response.status(404).end()
      }
    }).catch(error => next(error))

})

/// get blog by id
blogRouter.get("/:id" , ( require, response , next ) => {
  Blog
   .findById(require.params.id)
   .then(blogs => {
      if(blogs){
       response.status(200).json(blogs)
      }else{
       response.status(404).json("user not found")
      }
    }).catch(error => next(error))

})

/// add blog
blogRouter.post('/' ,( request ,response , next ) => {

  const blog = new Blog(request.body)

  blog
   .save()
   .then(result => {
   
    if(result){
      response.status(201).json(result)
    }else{
      response.status(401).send('something wrong happened')
    }
  }).catch(error => next(error))
})


///delete blog
blogRouter.delete('/:id', (request, response,next) => {

  const idToDelete = request.params.id

  Blog.findByIdAndDelete(idToDelete).then((result) => {
    console.log(result)
    if(result){
      response.status(200).send(`blog deleted ${result.name}`)
    }
    else{
      response.status(400).send('Error while deleting blog')
    }
  }).catch(error => next(error))

})



module.exports = blogRouter