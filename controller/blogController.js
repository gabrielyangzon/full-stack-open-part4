const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get("/" , async ( require, response , next ) => {
  const blogs = await Blog
   .find({})

    if(blogs){
       response.status(200).json(blogs)
      }else{
       response.status(404).end()
      }

})

/// get blog by id
blogRouter.get("/:id" , async ( require, response , next ) => {
 const resultBlog = await Blog
   .findById(require.params.id)


  if(resultBlog){
       response.status(200).json(resultBlog)
      }else{
       response.status(404).json("user not found")
      }

 

})

/// add blog
blogRouter.post('/' , async ( request ,response , next ) => {

  const blog = new Blog(request.body)

  const savedBlog =  await  blog
   .save()
    if(savedBlog){
      response.status(201).json(savedBlog)
    }else{
      response.status(401).send('something wrong happened')
    }

})


///delete blog
blogRouter.delete('/:id', async (request, response,next) => {

   const idToDelete = request.params.id

   await Blog.findByIdAndDelete(idToDelete)

   response.status(204).end(`blog deleted `)
   
})



module.exports = blogRouter