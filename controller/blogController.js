const blogRouter = require('express').Router()

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



module.exports = blogRouter